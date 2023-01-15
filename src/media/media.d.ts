import type { UartService } from 'microbit-web-bluetooth/types/services/uart';
// import * as microbit from "microbit-web-bluetooth";

/// <reference types="web-bluetooth" />

type deviceList = deviceState[];

interface deviceState {
  //두개합치기.
  name: string | undefined;
  characteristics: BluetoothRemoteGATTCharacteristic | null;
  uartService: UartService | null;
  s_uuid: string;
  gatt: BluetoothRemoteGATTServer | null | undefined;
  kind: string;
  id: string;
}

interface deviceSearchInfoState {
  esp32: esp32State;
  microbit: microbitState;
}
interface esp32State {
  uuid: string;
  prefix: string;
}
interface microbitState {
  uuid: string;
  tx: string;
  rx: string;
  prefix: string;
}
interface observerState {
  notify: (string) => void;
}
type bleEventList = bleEventState[];

interface bleEventState {
  id: string;
  func: () => void;
}
interface reconnectOption {
  count: number;
  second: number;
}

type SettingDeviceKindStatus = 'audioinput' | 'audiooutput' | 'videoinput';
interface SettingDeviceOption {
  kind: SettingDeviceKindStatus;
  outputElement: 'option' | 'div'; // default : option
}

interface GetStreamSettings {
  video: boolean;
  audio: boolean;
  elementKind: 'canvas' | 'video';
  outputElement: HTMLCanvasElement | HTMLVideoElement;
}

// moth
interface WebSocketState {
  ws: string;
  host: string;
  port: string;
  api: string;
  channelID?: string;
  channelName?: string;
  source: string;
  option: wsOption;
}
interface wsOption {
  bundle: boolean;
  instant: boolean;
}

interface ObserverState {
  // notify: void;
  notify: (message: string) => void;
}

type MothEventList = MothEventState[];
interface MothEventState {
  id: 'onopen' | 'getmime' | 'snapShot' | 'onmessage';
  // func: void;
  func: () => void;
}
