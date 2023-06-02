import type {
  GetStreamSettings,
  SettingDeviceKindStatus,
  SettingDeviceOption,
} from "./media";

interface permissionStatus {
  microphone: void | PermissionStatus | string | null;
  camera: void | PermissionStatus | string | null;
  geolocation: void | PermissionStatus | string | null;
}
interface optionState {
  el: HTMLSelectElement;
  input: SettingDeviceOption;
}
/**
 * user의 미디어를 가져오는 클래스
 * 싱글톤 사용
 * 카메라나 마이크의변화에 반응형이었으면.
 */
// class userMedia {
//   private static instance: userMedia;

//   public static getInstance(): userMedia {
//     if (!userMedia.instance) {
//       userMedia.instance = new userMedia();
//     }
//     return userMedia.instance;
//   }
// }
/**
 *
 * @returns {
 *  deviceId : string,
 *  groupId : string,
 *  kind : "videoinput, audioinput, audiooutput",
 *  label : string
 * }
 */
export const errorHandler = (error: unknown, ms: string) => {
  if (error instanceof Error) ms = error.message;
  else ms = String(error);
  // 진행은 하겠지만, 리포트는 전송하자.
  throw new Error(ms);
};

const searchDeviceList = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log("searchDevice", devices);
    return devices;
  } catch (error: unknown) {
    errorHandler(error, "not exist device");
  }
};
type PermissionTypes = "camera" | "microphone" | "geolocation" | "all";
/**
 *
 * @param kind, "camera" or "microphone" or "geolocation"
 * geolocation추가로 인해 userMedia에서 제거 해야합니다.
 * @returns {camera:"granted", camera:"denied" , camera:"prompt"}
 */
const cameraPermission = async (kind: "camera" | "microphone" | "all") => {
  const permission: permissionStatus = {
    microphone: null,
    camera: null,
    geolocation: null,
  };
  const checkPermission = async (device: string) => {
    const permission = navigator.permissions
      .query(
        Object.assign({
          name: device,
        })
      )
      .then((res) => res.state)
      .catch((error: unknown) => {
        errorHandler(error, "navigator.permissions Error");
      });
    return permission;
  };
  // Object.assign({
  //   name: "microphone",
  // })
  document.body.addEventListener("PermissionStatus", (e) => {
    console.log("PermissionStatusChange", e);
  });

  try {
    if (kind === "all") {
      permission.microphone = await checkPermission("microphone");
      permission.camera = await checkPermission("camera");
    } else {
      permission.camera = await checkPermission(kind);
    }
    //"granted", "denied" , "prompt"
    console.log("권한 : ", permission);
    return permission;
  } catch (error: unknown) {
    errorHandler(error, "cameraPermission Error");
  }
};

/**
 *
 * @param devices searchDeviceList로 리턴한 모든 디바이스모음.
 * @param element 디바이스를 담을 selectElement
 * @param kind 디바이스 종류 audioinput, audioouput, videoinput
 * @returns
 */
const settingDevice = async (
  //select element 제작.
  devices: MediaDeviceInfo[],
  element: HTMLElement,
  option: SettingDeviceOption
) => {
  console.log(devices, element, option);
  await clearSettingDevice(element);

  let selected = document.createElement(option.outputElement);
  const videos = [];
  devices.map((device: MediaDeviceInfo) => {
    if (option.kind !== device.kind) {
      return;
    }
    //kind : audioinput,videoinput,audiooutput
    console.log("input device3", device);
    videos.push(device);

    const optionVideo = document.createElement("option"); //option 엘리먼트 생성
    device.deviceId
      ? (optionVideo.value = device.deviceId)
      : (optionVideo.value = "true");
    device.label
      ? (optionVideo.text = device.label)
      : (optionVideo.text = `video${videos.length}`);

    element.appendChild(optionVideo);
    if (optionVideo.selected) {
      selected = optionVideo;
    }
  });
  if (videos.length === 0) {
    const optionVideo = document.createElement("option"); //option 엘리먼트 생성
    optionVideo.text = "연결된 카메라 없음";
    optionVideo.value = "";
    element.appendChild(optionVideo);
  }
  return selected;
}; // settingDevice

const clearSettingDevice = (element: HTMLElement) => {
  try {
    console.log("clearSelectBox", element.childNodes.length);
    if (element.childNodes.length > 0) {
      //디바이스 메뉴가 새로 추가되기 전에 기존의 메뉴를 지운다.
      while (element.firstChild) {
        console.log(element.firstElementChild);
        element.removeChild(element.firstChild); // 연결안된 디바이스는 인식안함. firstChild
      }
    }
  } catch (error: unknown) {
    errorHandler(error, "clearSettingDevice Error");
  }
};

const deviceChanger = async (options: Array<optionState>) => {
  const devices = (await searchDeviceList()) as MediaDeviceInfo[];
  options.map((option) => {
    settingDevice(devices, option.el, option.input);
  });
};
const AddAutoDeviceChanger = (options: Array<optionState>) => {
  addEventListener("devicechange", () => deviceChanger(options));
  // 새로운 디바이스가 생길 경우.
};
const onRemoveDeviceChanger = () => {
  // removeEventListener("devicechange", deviceChanger);
};
class GetStream {
  private static instance: GetStream | undefined;
  private constraints: MediaStreamConstraints;
  private audioStream: MediaStream | null;
  private elementKind: "video" | "canvas";
  public outputElement: HTMLCanvasElement | HTMLVideoElement;
  private canvasInputVideo: HTMLVideoElement;

  private constructor() {
    this.constraints = {
      audio: false,
      video: false,
    };
    this.elementKind = "video";
    this.outputElement = {} as HTMLCanvasElement | HTMLVideoElement;
    this.canvasInputVideo = document.createElement("video");
    this.audioStream = null;
  }

  // 메소드 이름은 달라도 상관없다.
  public static getInstance() {
    this.instance = new GetStream();
    //싱글톤
    return this.instance || (this.instance = new this()); // 싱글톤
    // return this.instance;
  }
  permission(kind: "camera" | "microphone" | "all") {
    return cameraPermission(kind);
  }

  settings(options: GetStreamSettings) {
    this.constraints.video = options.video;
    this.constraints.audio = options.audio;
    this.elementKind = options.elementKind;
    // video | canvas중 무엇을 사용할 것인가.
    this.outputElement = options.outputElement;
    // console.log(options.outputElement.id);
    // outputElement.id => deviceId로 사용
  }

  private draw() {
    const canvas = this.outputElement as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      this.canvasInputVideo,
      0,
      0,
      this.outputElement.width,
      this.outputElement.height
    );
    requestAnimationFrame(() => this.draw());
  }
  async getVideoStream(deviceId?: string, width?: number, height?: number) {
    // 개선 중
    if (deviceId) {
      this.constraints.video = {
        deviceId: { exact: deviceId },
        width: { ideal: width },
        height: { ideal: height },
      };
      //직접 id를 넣어줄 경우 id의 stream만 뽑아서 보내줌.
    } else {
      // settings options대로 실행.
      if (this.outputElement.id) {
        this.constraints.video = {
          deviceId: { exact: this.outputElement.id },
          width: { ideal: this.outputElement.width },
          height: { ideal: this.outputElement.height },
        };
      } else {
        this.constraints.video = true;
      }
      this.constraints.audio = false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      // deviceId를 직접 받을 경우 stream 리턴 후 종료

      if (this.outputElement instanceof HTMLVideoElement) {
        this.outputElement.srcObject = stream;
        this.outputElement.play();
        console.log("비디오 켜짐");
      } else {
        // canvas는 draw
        this.canvasInputVideo.srcObject = stream;

        this.canvasInputVideo.play();
        // requestAnimationFrame(() => this.draw());
      }
      // if (deviceId) return stream;

      return stream;
    } catch (err) {
      console.log("GetStream.getUserMedia error", err);
    }
  }

  async getAudioStream(audioId?: string) {
    // 개선 필요
    if (audioId) {
      this.constraints.audio = {
        deviceId: { exact: audioId },
      };
    } else {
      this.constraints.audio = true;
    }
    this.constraints.video = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      this.audioStream = stream;
      return stream;
    } catch (err) {
      console.log("GetStream.getUserMedia error", err);
    }
  }
  initInstance() {
    // this.instance = undefined;
    this.constraints = {
      audio: false,
      video: false,
    };
    const video = this.outputElement as HTMLVideoElement;
    video.srcObject = null;
    // 왜 굳이 audio만 담아서 없애줄까??
    if (this.audioStream) {
      this.audioStream.getAudioTracks()[0].stop();
      this.audioStream = null;
    }
  }
}

let isDevice = false;
const reconnectCamera = async () => {
  let newDevice = {};
  const devices = (await searchDeviceList()) as MediaDeviceInfo[];
  devices.map((device: MediaDeviceInfo) => {
    if (device.kind === "videoinput") {
      // if (
      //   device.label === roomStore.arenaCamera.name ||
      //   device.deviceId === roomStore.arenaCamera.id
      // ) {
      isDevice = true;
      newDevice = {
        id: device.deviceId,
        name: device.label,
      };
      console.log("디바이스 찾음.", newDevice);
      // }
    }
  });
  if (!isDevice) {
    setTimeout(() => {
      reconnectCamera();
    }, 1000);
  } else {
    return newDevice;
  }
};

const mediaClear = (el: HTMLVideoElement, stream: MediaStream | null) => {
  //비디오를 받아와서 끄는걸로 바꾸자.
  if (el && stream) {
    if (el.srcObject) {
      //미디어가 켜져있고, map을 송출하지 않는 경우.
      el.pause();
      el.srcObject = null;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });
      stream = null;
      console.log("미디어끔");
    }
  }
};
export const media = {
  searchDeviceList,
  settingDevice,
  clearSettingDevice,
  cameraPermission,
  GetStream,
};
