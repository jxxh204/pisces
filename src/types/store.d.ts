type FileNames = "About" | "Contact" | "Projects" | "Game";
type FinderKind = "normal" | "tab" | "list";

type FinderComponentType = {
  [name in FileNames]: {
    name: name;
    zIndex: number;
    kind: FinderKind;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
  };
};
type TabName = "Coplay" | "hello-mars" | "blockbot" | "layer-after-layer";
type TabNames = { name: TabName; click: boolean };

type Tags =
  | "Vue3"
  | "TypeScript"
  | "WebRTC"
  | "WebCodec"
  | "Electron"
  | "React";

type TabComponentType = {
  [name in FinderTab]: {
    name: name;
    tags: Tags;
  };
};

//객체로 관리한다.
//장점은 검색이 빠르고
//이미 있는 파인더면 새로 추가안하고 앞으로 놓기 쉽다.
