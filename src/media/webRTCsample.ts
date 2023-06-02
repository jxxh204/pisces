import type { CandidateMessageType } from "./media";

type VideoState = HTMLVideoElement;
export default class webRTC {
  //싱글톤으로 변경하자.

  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  dcm_msg: RTCDataChannel | undefined;
  config: RTCConfiguration;
  localStream?: MediaStream | undefined;
  remoteVideo: VideoState;
  localVideo: VideoState;
  socket: WebSocket | null;
  baseUrl: string;

  constructor(remoteVideo: VideoState, localVideo: VideoState) {
    this.pc = null;
    this.remoteVideo = remoteVideo;
    this.localVideo = localVideo;
    this.dcm_msg = undefined;
    // this.localStream;
    this.config = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        // {
        //   urls: "turn:192.158.29.39:3478?transport=udp",
        //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        //   username: "28224511:1379330808",
        // },
        // {
        //   urls: "turn:192.158.29.39:3478?transport=tcp",
        //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        //   username: "28224511:1379330808",
        // },
      ],
      // iceTransportPolicy: "all",
      // bundlePolicy: "balanced",
      // rtcpMuxPolicy: "require",
      // iceCandidatePoolSize: 0,
      // sdpSemantics: "unified-plan",
      // extmapAllowMixed: true,
      // "heartbeat": 5000
    };
    // this.config = {
    //   //config 설정
    //   iceServers: [
    //     { urls: `stun:stun.l.google.com:19302` },
    //     {
    //       urls: `turn:turn01.hubl.in?transport=udp`,
    //       username: "28224511:1379330808",
    //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    //     },
    //     {
    //       urls: `turn:turn02.hubl.in?transport=tcp`,
    //       username: "28224511:1379330808",
    //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    //     },
    //   ],
    // };
    // this.localStream = localStream;
    // this.subVideoEl = subVideoEl;
    this.socket = null;
    this.baseUrl = "ws://localhost:3000";
  }
  async handleOffer(offer: string) {
    //RTCOfferOptions JSON으로 묶어서옴.
    if (!this.pc) {
      console.error("existing peerconnection");
      return;
    }
    //여기서 영상 실행.
    // this.createPeerConnection(); // 추가
    const parseOffer = JSON.parse(offer);
    this.pc.setRemoteDescription(
      new RTCSessionDescription({
        type: "offer",
        sdp: parseOffer,
      })
    );
    //offer 받으면 바로 answer 보냄.
    const answer = await this.pc?.createAnswer();
    this.pc.setLocalDescription(answer);
    this.sendMessage("answer", JSON.stringify(answer.sdp));
  }

  async handleAnswer(answer: string) {
    console.log("handleAnswer", answer);
    if (!this.pc) {
      console.error("handleAnswer no peerconnection");
      return;
    }
    // 여기 문제. 두번째 유저에서. //offer가 문제일 수 있다.
    // 순서문제일 확률이 높다.
    const parseAnswer = JSON.parse(answer);
    this.pc.setRemoteDescription(
      new RTCSessionDescription({
        type: "answer",
        sdp: parseAnswer,
      })
    );
  }

  async handleCandidate(candidate: string) {
    // type : RTCIceCandidate
    if (!this.pc) {
      console.error("handleCandidate no peerconnection");
      return;
    }
    const parseCandidate = JSON.parse(candidate);
    console.log("handleCandidate", parseCandidate, this.pc.remoteDescription);
    if (!parseCandidate.candidate) {
      await this.pc.addIceCandidate(undefined);
    } else {
      await this.pc.addIceCandidate(parseCandidate).then((e) => {
        console.log("addIceCandidate success");
      });
    }
  }
  openWebSocket() {
    const wsurl = this.baseUrl + "/ws";
    this.socket = new WebSocket(wsurl);

    this.socket.onopen = (evt) => {
      console.log("socket open");
      this.createPeerConnection();
      this.sendMessage("id", ""); // id
    };
    this.socket.onmessage = (e) => {
      // if (!this.localStream) {
      //   console.log("not ready yet");
      //   return;
      // }
      // console.log(e.data);
      console.log("onmessge", e.data);
      try {
        const { type, data, Id } = JSON.parse(e.data);
        if (type === "log") {
          return;
        }
        // console.log("onmessge", type, Id);

        switch (type) {
          case "id": //다른 유저 입장.
            if (this.pc) {
              console.log("already in call, ignoring");
              return;
            }
            // this.openRTC(); // peer가 없을 경우.
            break;
          case "offer":
            this.handleOffer(data);
            break;
          case "answer":
            this.handleAnswer(data);
            break;
          case "candidate":
            console.log("onmessage candidate ", JSON.parse(data));
            this.handleCandidate(data);
            break;
          case "ready":
            // A second tab joined. This tab will initiate a call unless in a call already.
            if (this.pc) {
              console.log("already in call, ignoring");
              return;
            }
            // makeCall();
            break;
          case "bye":
            if (this.pc) {
              // hangup();
            }
            break;
          default:
            console.log("unhandled", e);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    };
    this.socket.onclose = (evt) => {
      console.log("socket close");
    };
  }
  createPeerConnection() {
    console.log("createPeerConnection");
    // 일단 이거만씀.

    this.pc = new RTCPeerConnection(this.config);

    this.pc?.addTransceiver("video", { direction: "recvonly" });
    this.pc?.addTransceiver("audio", { direction: "recvonly" });

    this.pc.ontrack = (evt) => {
      //sub
      console.log("ontrack", evt.streams[0], evt.streams[0].getTracks());

      if (this.remoteVideo) {
        this.remoteVideo.srcObject = evt.streams[0];
        this.remoteVideo.play();
      }
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
      if (this.pc?.iceConnectionState === "connected") {
        console.log("connected!");
        // Peers connected!
      }
    };

    this.pc.onicecandidate = (evt) => {
      const data = {
        type: "candidate",
        candidate: "",
        sdpMid: "",
        sdpMLineIndex: 0,
      } as CandidateMessageType;

      if (evt.candidate) {
        data.candidate = evt.candidate.candidate;
        data.sdpMid = evt.candidate.sdpMid as string;
        data.sdpMLineIndex = evt.candidate.sdpMLineIndex as number;
      }
      console.log("onicecandidate", evt.candidate, data);

      this.sendMessage("candidate", JSON.stringify(data));
    };
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.srcObject = stream;
        stream?.getTracks().forEach((track) => {
          if (stream) this.pc?.addTrack(track, stream);
        });
      });
    this.pc?.createOffer().then((offer) => {
      console.log("offer", offer);
      this.pc?.setLocalDescription(offer);
      //JSON.stringify 추가
      this.sendMessage("offer", JSON.stringify(offer.sdp)); //오퍼를 보낸다. 보낸사람은 answer를 받아야한다.
    });
    // 임시
    // this.localStream?.getTracks().forEach((track) => {
    //   console.log(" this.localStream", this.localStream);
    //   if (this.localStream) this.pc?.addTrack(track, this.localStream);
    // });
  }
  sendMessage(key: string, data: string) {
    // 시그널 서버로의 전송
    const msg = {
      id: "",
      target: "",
      type: key,
      data,
    };
    this.socket?.send(JSON.stringify(msg));
  }
  createDataChannel() {
    this.dcm_msg = this.pc?.createDataChannel("msg");
    if (this.dcm_msg) {
      this.dcm_msg.onopen = () => console.log("dcm has opened!!!!!!");
      this.dcm_msg.onclose = () => console.log("dcm has closed111111");
      this.dcm_msg.onmessage = (e) => {
        console.log("this.dcm_msg message!", e);
      };
    }
  }
}
