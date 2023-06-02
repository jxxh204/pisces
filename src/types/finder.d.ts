type FileNames = "Home" | "About" | "Contact" | "Projects" | "Game";
type FinderKind = "normal" | "tab" | "list";
type FinderComponents = {
  name: name;
  zIndex: number;
  kind?: FinderKind;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
};
type FinderComponentType = {
  [name in FileNames]: FinderComponents;
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
  | "VanillaJS"
  | "WebRTC"
  | "WebWorker"
  | "WebCodec"
  | "WebBluetooth"
  | "Electron"
  | "React & Redux"
  | "Scratch3"
  | "CI"
  | "TEST"
  | "Amplify"
  | "GraphQL"
  | "RestAPI"
  | "Tailwindcss"
  | "SideProject";

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
