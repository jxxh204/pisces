export default class webRTC {
  //싱글톤으로 변경하자.

  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  config: RTCConfiguration;
  localStream: MediaStream | null;
  socket: WebSocket | null;
  wsurl: string;
  constructor(localStream: MediaStream) {
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
    this.socket = null;
    this.wsurl = "ws://localhost:9100/pub";
  }
  async handleOffer(offer: RTCOfferOptions) {
    if (this.pc) {
      console.error("existing peerconnection");
      return;
    }
    await this.pc?.setRemoteDescription(
      new RTCSessionDescription({
        type: "offer",
        sdp: offer,
      })
    );

    const answer = await this.pc?.createAnswer();
    this.sendMessage("answer", answer.sdp);
    await this.pc.setLocalDescription(answer);
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
      await this.pc.addIceCandidate(candidate);
    }
  }

  openWebSocket(kind: string) {
    this.socket = new WebSocket(this.wsurl);
    this.socket.onopen = (evt) => {
      console.log("socket open");
    };
    this.socket.onmessage = (e) => {
      if (!this.localStream) {
        console.log("not ready yet");
        return;
      }
      const { type, data } = JSON.parse(e.data);
      console.log(type, kind);
      switch (type) {
        case "offer":
          //sub
          if (kind === "sub") this.handleOffer(data);
          break;
        case "answer":
          //pub
          if (kind === "pub") this.handleAnswer(data);
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
  async openPub() {
    this.openWebSocket("pub");

    this.pc = new RTCPeerConnection(this.config);

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection: " + this.pc?.iceConnectionState + "\n");
    };

    this.pc.onicecandidate = (evt) => {
      console.log("onicecandidate", evt);
      // if (evt.candidate === null) {
      // 	console.log('lsd', lsd);
      // 	lsd = btoa(JSON.stringify(this.pc.localDescription));
      // }
    };
    this.localStream?.getTracks().forEach((track) => {
      // console.log(" this.localStream", this.localStream);
      if (this.localStream) this.pc?.addTrack(track, this.localStream);
    });
    setTimeout(async () => {
      const offer = await this.pc.createOffer();
      await this.sendMessage("offer", offer.sdp);
      await this.pc?.setLocalDescription(offer);
      // await this.openSub();
    }, 1000);
  }
  openSub() {
    this.openWebSocket("sub");
    this.pc = new RTCPeerConnection(this.config);
    console.log("🚀 ~ file: webRTCsample.ts:79 ~ openRTC ~ this.pc", this.pc);

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
      console.log("onicecandidate", evt);
    };
  }
  sendMessage(key: string, value: string) {
    console.log("sendMessage : ", key);
    const msg = {
      type: key,
      data: value,
    };
    this.socket?.send(JSON.stringify(msg));
  }
}
