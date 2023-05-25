import { Coplay2023 } from "@/assets/images/projects/coplay2023_main.svg";
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
type TabName =
  | "Coplay2023"
  | "Coplay"
  | "hello-mars"
  | "blockbot"
  | "layer-after-layer";

type TagName =
  | "Vue3"
  | "TypeScript"
  | "WebRTC"
  | "WebWorker"
  | "WebCodec"
  | "Electron"
  | "React"
  | "Scratch3"
  | "CI"
  | "TEST";

type TabComponentType = {
  [name in TabName]: TabComponent;
};
type TabComponent = {
  name: TabName;
  responsibilities: string;
  image: string;
  tags: TagName[];
  click: boolean;
  link: string;
  demo?: string;
  code?: string;
};

//객체로 관리한다.
//장점은 검색이 빠르고
//이미 있는 파인더면 새로 추가안하고 앞으로 놓기 쉽다.
