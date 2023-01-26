export default class RTC {
  // iceServers: [
  // 	{ urls: 'stun:stun.services.mozilla.com' },
  // 	{ urls: 'stun:stun.l.google.com:19302' }
  // ]
  pc: RTCPeerConnection | null;
  config: RTCConfiguration;
  constructor() {
    this.pc = null;
    // this.localStream;
    this.config = {
      //config 설정
      iceServers: [
        { urls: `stun.l.google.com:19302` },
        {
          urls: `turn:turn01.hubl.in?transport=udp`,
          username: "28224511:1379330808",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        },
        {
          urls: `turn02.hubl.in?transport=tcp`,
          username: "28224511:1379330808",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        },
      ],
      // iceTransportPolicy: 'relay', // 서버 안죽게.
    };
  }
  rtcStart() {
    // webRTC Start
    //websocket도 시작.
    this.onMessege();
    this.onOpen();
  }
  onMessege() {
    this.conn.onmessage = (evt) => {
      let d = JSON.parse(evt.data);
      // let type = d['type'];
      // let data = d['data'];
      const { type, data } = d;
      console.log(`onMessege : ${type}`);
      let candidate;

      switch (type) {
        case "answer":
          this.pc
            .setRemoteDescription(
              new RTCSessionDescription({
                type: "answer",
                sdp: data,
              })
            )
            .then(() => {
              console.log(type);
            })
            .catch((e) => {
              console.err(e);
            });
          break;
        case "candidate2":
          candidate = JSON.parse(data);
          this.pc
            .addIceCandidate(candidate)
            .then(() => {
              console.log(type);
            })
            .catch((e) => {
              console.err(e);
            });
          break;
        case "ping":
          // just ignore, for healthcheck
          break;
        case "joins": //채널에 입장한 인원
          console.log("join", data);
          break;
        case "event":
          // server sent event
          break;
        default:
          // just ignore if you don't know this type message
          console.warn("unexpected message", type, data);
      }
    };
  }
  onOpen() {
    this.conn.onopen = () => {
      this.pc = new RTCPeerConnection(config);

      //sub addTransceiver

      this.pc.ontrack = (evt) => {
        console.log("ontrack", evt);
      };

      this.pc.oniceconnectionstatechange = () => {
        console.log("ICE Connection: " + this.pc.iceConnectionState + "\n");
      };

      this.pc.onicecandidate = (evt) => {
        console.log("onicecandidate", evt);
        // if (evt.candidate === null) {
        // 	console.log('lsd', lsd);
        // 	lsd = btoa(JSON.stringify(this.pc.localDescription));
        // }
      };
      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream);
      });

      this.pc
        .createOffer()
        .then((offer) => {
          return this.pc.setLocalDescription(offer);
        })
        .then(() => {
          this.conn.send(
            JSON.stringify({
              type: "offer",
              data: this.pc.localDescription.sdp,
            })
          );
        })
        .catch((e) => {
          console.error(e);
        });
    };

    this.conn.onclose = () => {
      console.log("closed.");
      this.conn = null;
      if (!this.isInit) {
        setTimeout(() => {
          console.log("재연결 시도");
          this.pubStart();
        }, 3000);
      }
    };
  }
}
