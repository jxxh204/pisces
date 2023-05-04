type FileNames = "About" | "Contact" | "Projects" | "Game";
type FinderComponentType = {
  [name: FileNames]: FileNames;
  About: {
    name: FileNames;
    zIndex: number;
    width?:number,
    height?:number,
    top?:number,
    left?:number
  };
  Contact: {
    name: FileNames;
    zIndex: number;
    width?:number,
    height?:number,
    top?:number,
    left?:number
  };
  Projects: {
    name: FileNames;
    zIndex: number;
    width?:number,
    height?:number,
    top?:number,
    left?:number
  };
  Game: {
    name: FileNames;
    zIndex: number;
    width?:number,
    height?:number,
    top?:number,
    left?:number
  };
};

//객체로 관리한다.
//장점은 검색이 빠르고
//이미 있는 파인더면 새로 추가안하고 앞으로 놓기 쉽다.
