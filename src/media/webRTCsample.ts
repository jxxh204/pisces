export default class webRTC {
  //싱글톤으로 변경하자.

  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  config: RTCConfiguration;
  localStream: MediaStream | null;
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
  }
  // onMessege() {

  //     switch (type) {
  //       case "answer":
  //         this.pc
  //           .setRemoteDescription(
  //             new RTCSessionDescription({
  //               type: "answer",
  //               sdp: data,
  //             })
  //           )
  //           .then(() => {
  //             console.log(type);
  //           })
  //           .catch((e) => {
  //             console.err(e);
  //           });
  //         break;
  //       case "candidate2":
  //         candidate = JSON.parse(data);
  //         this.pc
  //           .addIceCandidate(candidate)
  //           .then(() => {
  //             console.log(type);
  //           })
  //           .catch((e) => {
  //             console.err(e);
  //           });
  //         break;
  //       case "ping":
  //         // just ignore, for healthcheck
  //         break;
  //       case "joins": //채널에 입장한 인원
  //         console.log("join", data);
  //         break;
  //       case "event":
  //         // server sent event
  //         break;
  //       default:
  //         // just ignore if you don't know this type message
  //         console.warn("unexpected message", type, data);
  //     }
  //   };
  // }
  openPub() {
    this.pc = new RTCPeerConnection(this.config);
    console.log("🚀 ~ file: webRTCsample.ts:79 ~ openRTC ~ this.pc", this.pc);

    //sub addTransceiver

    this.pc.ontrack = (evt) => {
      //sub
      console.log("ontrack", evt);
    };

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
      if (this.localStream) this.pc?.addTrack(track, this.localStream);
    });

    this.pc
      .createOffer()
      .then((offer) => {
        console.log("offer", offer);

        return this.pc?.setLocalDescription(offer);
      })
      .then(() => {
        // this.conn.send(
        //   JSON.stringify({
        //     type: "offer",
        //     data: this.pc.localDescription.sdp,
        //   })
        // );
      })
      .catch((e) => {
        console.error(e);
      });
  }
  openSub() {}
}
