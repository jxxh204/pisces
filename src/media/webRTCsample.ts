import type { CandidateMessageType } from "./media";

export default class webRTC {
  //싱글톤으로 변경하자.

  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  dcm_msg: RTCDataChannel | null;
  config: RTCConfiguration;
  localStream?: MediaStream | undefined;
  subVideoEl: HTMLVideoElement;
  uuid: string;
  socket: WebSocket | null;
  baseUrl: string;

  constructor(
    uuid: string,
    localStream?: MediaStream,
    subVideoEl?: HTMLVideoElement
  ) {
    this.pc = null;
    this.dcm_msg = null;
    // this.localStream;
    this.config = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "turn:192.158.29.39:3478?transport=udp",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
          username: "28224511:1379330808",
        },
        {
          urls: "turn:192.158.29.39:3478?transport=tcp",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
          username: "28224511:1379330808",
        },
      ],
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
    this.uuid = uuid;
    this.socket = null;
    this.baseUrl = "ws://localhost:3000";
  }
  async handleOffer(offer: RTCOfferOptions) {
    if (!this.pc) {
      console.error("existing peerconnection");
      return;
    }
    //여기서 영상 실행.
    await this.pc.setRemoteDescription(
      new RTCSessionDescription({
        type: "offer",
        sdp: offer,
      })
    );
    // this.localStream?.getTracks().forEach((track) => {
    //   // console.log(" this.localStream", this.localStream);
    //   if (this.localStream) this.pc?.addTrack(track, this.localStream);
    // });

    const answer = await this.pc?.createAnswer();
    await this.sendMessage("answer", answer.sdp);
    this.pc.setLocalDescription(answer);
  }

  async handleAnswer(answer: string) {
    if (!this.pc) {
      console.error("no peerconnection");
      return;
    }
    await this.pc.setRemoteDescription(
      new RTCSessionDescription({
        type: "answer",
        sdp: answer,
      })
    );
  }

  async handleCandidate(candidate: RTCIceCandidate) {
    if (!this.pc) {
      console.error("no peerconnection");
      return;
    }

    if (!candidate.candidate) {
      await this.pc.addIceCandidate(null);
    } else {
      await this.pc.addIceCandidate(candidate).then((e) => {
        console.log("addIceCandidate success");
      });
    }
  }
  openWebSocket() {
    const wsurl = this.baseUrl + "/ws";
    this.socket = new WebSocket(wsurl);

    this.socket.onopen = (evt) => {
      console.log("socket open");
      this.sendMessage("id", this.uuid);
    };
    this.socket.onmessage = (e) => {
      // if (!this.localStream) {
      //   console.log("not ready yet");
      //   return;
      // }
      // console.log(e.data);
      const { type, data, id } = JSON.parse(e.data);
      if (id === this.uuid) return;
      console.log("onmessge", type, data);
      try {
        switch (type) {
          case "id": //유저 입장.
            if (this.pc) {
              console.log("already in call, ignoring");
              return;
            }
            this.openRTC();

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
    // 일단 이거만씀.
    this.pc = new RTCPeerConnection(this.config);

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
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
        data.sdpMid = evt.candidate.sdpMid;
        data.sdpMLineIndex = evt.candidate.sdpMLineIndex;
      }
      console.log("onicecandidate", evt);

      this.sendMessage("candidate", JSON.stringify(data));
    };
    this.pc.ontrack = (evt) => {
      console.log(ontrack);
      //sub
      // console.log("ontrack", evt.streams[0], this.subVideoEl);
      // this.subVideoEl.srcObject = evt.streams[0];
      // console.log(this.subVideoEl.srcObject);
      // this.subVideoEl.play();
    };
    // this.localStream?.getTracks().forEach((track) => {
    //   console.log(" this.localStream", this.localStream);
    //   if (this.localStream) this.pc?.addTrack(track, this.localStream);
    // });
  }
  async openRTC() {
    this.createPeerConnection();
    this.pc?.addTransceiver("video", { direction: "recvonly" });
    // this.pc?.addTransceiver("audio", { direction: "recvonly" });
    const offer = await this.pc?.createOffer();
    await this.sendMessage("offer", offer.sdp);
    this.pc?.setLocalDescription(offer);
  }
  sendMessage(key: string, value: string) {
    // 시그널 서버로의 전송
    const msg = {
      id: this.uuid,
      target: "",
      type: key,
      data: value,
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
  // async openPub() {
  //   this.openWebSocket("pub");

  //   this.pc = new RTCPeerConnection(this.config);

  //   this.pc.oniceconnectionstatechange = () => {
  //     console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
  //   };

  //   this.pc.onicecandidate = (evt) => {
  //     const message = {
  //       type: "candidate",
  //       candidate: null,
  //       sdpMid: null,
  //       sdpMLineIndex: null,
  //     } as CandidateMessageType;

  //     if (evt.candidate) {
  //       message.candidate = evt.candidate.candidate;
  //       message.sdpMid = evt.candidate.sdpMid;
  //       message.sdpMLineIndex = evt.candidate.sdpMLineIndex;
  //     }
  //     this.socket?.send(JSON.stringify(message));
  //     console.log("onicecandidate", evt);
  //   };
  //   this.localStream?.getTracks().forEach((track) => {
  //     // console.log(" this.localStream", this.localStream);
  //     if (this.localStream) this.pc?.addTrack(track, this.localStream);
  //   });
  //   setTimeout(async () => {
  //     const offer = await this.pc?.createOffer();
  //     await this.sendMessage("offer", offer.sdp);
  //     await this.pc?.setLocalDescription(offer);
  //     await this.openSub();
  //   }, 1000);
  // }
  // openSub() {
  //   this.pc = new RTCPeerConnection(this.config);
  //   // setTimeout(() => {
  //   //   // 임시
  //   //   this.openWebSocket("sub");
  //   // }, 500);
  //   //sub addTransceiver
  //   this.pc.addTransceiver("video", { direction: "recvonly" });
  //   this.pc.ontrack = (evt) => {
  //     //sub
  //     console.log("ontrack", evt.streams[0]);
  //   };

  //   this.pc.oniceconnectionstatechange = () => {
  //     console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
  //   };

  //   this.pc.onicecandidate = (evt) => {
  //     const message = {
  //       type: "candidate",
  //       candidate: null,
  //       sdpMid: null,
  //       sdpMLineIndex: null,
  //     } as CandidateMessageType;

  //     if (evt.candidate) {
  //       message.candidate = evt.candidate.candidate;
  //       message.sdpMid = evt.candidate.sdpMid;
  //       message.sdpMLineIndex = evt.candidate.sdpMLineIndex;
  //     }
  //     this.socket?.send(JSON.stringify(message));
  //     console.log("onicecandidate", evt);
  //   };
  // }
}
