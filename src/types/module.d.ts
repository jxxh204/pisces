interface ObserverState {
  // notify: void;
  notify: (message: string) => void;
}

type ObEventList = ObEventState[];
interface ObEventState {
  id:
    | "onopen"
    | "onmessage"
    | "signal_open"
    | "signal_message"
    | "decode_addSubStreams"
    | "mothPub_open";
  // func: void;
  func: (info: any) => Promise<void>;
}

//decoder
type ObserverInfoType = {
  source_name: string;
  decodeStream: MediaStream;
};
