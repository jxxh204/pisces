export default class webRTC {
  //싱글톤으로 변경하자.

  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  config: RTCConfiguration;
  localStream: MediaStream | undefined;
  uuid: string;
  socket: WebSocket | null;
  baseUrl: string;
  constructor(localStream: MediaStream | undefined, uuid: string) {
    this.pc = null;
    // this.localStream;
    this.config = {
      //config 설정
      iceServers: [
        { urls: `stun:stun.l.google.com:19302` },
        {
          urls: `turn:turn01.hubl.in?transport=udp`,
          username: "28224511:1379330808",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        },
        {
          urls: `turn:turn02.hubl.in?transport=tcp`,
          username: "28224511:1379330808",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        },
      ],
      // iceTransportPolicy: 'relay', // 서버 안죽게.
    };
    this.localStream = localStream;
    this.uuid = uuid;
    this.socket = null;
    this.baseUrl = "ws://localhost:9100";
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
    this.localStream?.getTracks().forEach((track) => {
      // console.log(" this.localStream", this.localStream);
      if (this.localStream) this.pc?.addTrack(track, this.localStream);
    });

    const answer = await this.pc?.createAnswer();
    await this.sendMessage("answer", answer.sdp);
    await this.pc.setLocalDescription(answer);
  }

  async handleAnswer(answer: string) {
    console.log(
      "🚀 ~ file: webRTCsample.ts:55 ~ webRTC ~ handleAnswer ~ handleAnswer"
    );
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
    console.log("handleCandidate", candidate);
    if (!candidate.candidate) {
      await this.pc.addIceCandidate(null);
    } else {
      await this.pc.addIceCandidate(candidate);
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
      if (!this.localStream) {
        console.log("not ready yet");
        return;
      }
      const { type, data, Id } = JSON.parse(e.data);
      console.log("onmessage", type, Id);
      if (Id === this.uuid) return;
      switch (type) {
        case "offer":
          this.handleOffer(data);
          break;
        case "answer":
          this.handleAnswer(data);
          break;
        case "candidate":
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
    };
    this.socket.onclose = (evt) => {
      console.log("socket close");
    };
  }
  async openRTC() {
    this.pc = new RTCPeerConnection(this.config);

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
    };

    this.pc.onicecandidate = (evt) => {
      const message = {
        type: "candidate",
        candidate: null,
        sdpMid: null,
        sdpMLineIndex: null,
      } as CandidateMessageType;

      if (evt.candidate) {
        message.candidate = evt.candidate.candidate;
        message.sdpMid = evt.candidate.sdpMid;
        message.sdpMLineIndex = evt.candidate.sdpMLineIndex;
      }
      this.socket?.send(JSON.stringify(message));
      console.log("onicecandidate", evt);
    };
    this.pc.addTransceiver("video", { direction: "recvonly" });
    this.pc.ontrack = (evt) => {
      //sub
      console.log("ontrack", evt.streams[0]);
    };
    this.localStream?.getTracks().forEach((track) => {
      // console.log(" this.localStream", this.localStream);
      if (this.localStream) this.pc?.addTrack(track, this.localStream);
    });
    setTimeout(async () => {
      const offer = await this.pc?.createOffer();
      await this.sendMessage("offer", offer.sdp);
      await this.pc?.setLocalDescription(offer);
      await this.openSub();
    }, 1000);
  }
  async openPub() {
    this.openWebSocket("pub");

    this.pc = new RTCPeerConnection(this.config);

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
    };

    this.pc.onicecandidate = (evt) => {
      const message = {
        type: "candidate",
        candidate: null,
        sdpMid: null,
        sdpMLineIndex: null,
      } as CandidateMessageType;

      if (evt.candidate) {
        message.candidate = evt.candidate.candidate;
        message.sdpMid = evt.candidate.sdpMid;
        message.sdpMLineIndex = evt.candidate.sdpMLineIndex;
      }
      this.socket?.send(JSON.stringify(message));
      console.log("onicecandidate", evt);
    };
    this.localStream?.getTracks().forEach((track) => {
      // console.log(" this.localStream", this.localStream);
      if (this.localStream) this.pc?.addTrack(track, this.localStream);
    });
    setTimeout(async () => {
      const offer = await this.pc?.createOffer();
      await this.sendMessage("offer", offer.sdp);
      await this.pc?.setLocalDescription(offer);
      await this.openSub();
    }, 1000);
  }
  openSub() {
    this.pc = new RTCPeerConnection(this.config);
    // setTimeout(() => {
    //   // 임시
    //   this.openWebSocket("sub");
    // }, 500);
    //sub addTransceiver
    this.pc.addTransceiver("video", { direction: "recvonly" });
    this.pc.ontrack = (evt) => {
      //sub
      console.log("ontrack", evt.streams[0]);
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
    };

    this.pc.onicecandidate = (evt) => {
      const message = {
        type: "candidate",
        candidate: null,
        sdpMid: null,
        sdpMLineIndex: null,
      } as CandidateMessageType;

      if (evt.candidate) {
        message.candidate = evt.candidate.candidate;
        message.sdpMid = evt.candidate.sdpMid;
        message.sdpMLineIndex = evt.candidate.sdpMLineIndex;
      }
      this.socket?.send(JSON.stringify(message));
      console.log("onicecandidate", evt);
    };
  }
  sendMessage(key: string, value: string) {
    console.log("sendMessage : ", key);
    const msg = {
      target: "",
      type: key,
      data: value,
    };
    this.socket?.send(JSON.stringify(msg));
  }
}
