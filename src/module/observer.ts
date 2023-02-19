// import type { ObEventList, ObEventState, ObserverState } from "@/types/module";

//singleton으로 여러개의 인스턴스 이벤트를 만들자.
export default class Observer {
  public static instance: Observer;
  public observer: ObserverState;
  public eventList: ObEventList;
  constructor() {
    this.observer = {} as ObserverState;
    this.eventList = [];
  }
  public init() {
    this.eventList = [];
  }
  public static getInstance = () => {
    if (Observer.instance) return Observer.instance;
    Observer.instance = new Observer();
    return Observer.instance;
  };

  private observerInterface() {
    const registerObserver = (observer: ObserverState) => {
      // 감시자 등록
      this.observer = observer;
    };
    const observer = {
      notify: (message: string, argument?: any) => {
        this.eventList.map((event: ObEventState) => {
          // const cmd = event.find((command) => command.id === message);

          if (event.id === message) {
            event.func(argument);
          }
        });
      },
    };
    registerObserver(observer);
  }
  notifyObserver(message: string, argument?: any) {
    if (argument) {
      this.observer.notify(message, argument);
      return;
    }
    this.observer.notify(message);
  }
  public addObserver = (event: ObEventState) => {
    this.eventList.push(event); //event입력
    console.log("addObserver", this.eventList);
    this.observerInterface(); // 인터페이스 동작
  };
  public removeObserver = (event: ObEventState) => {
    this.eventList = this.eventList.filter(
      (item: ObEventState) => item !== event
    );
    console.log("removeObserver", this.eventList);
    this.observerInterface();
  };
}
// const createObserver = (instance: any) => {
//     const videoSubObserver = [
//       {
//         id: 'onopen',
//         func: () => {
//           console.log('');
//         }
//       },
//       {
//         id: 'getmime',
//         func: () => {
//           console.log('getmime');
//         }
//       },

//       {
//         id: 'onmessage',
//         func: () => {
//           // console.log(isPending.value, props.name)
//           if (instance.mediaData) {
//             console.log(
//               '🚀 ~ file: moth.ts:34 ~ createObserver ~ instance.mediaData',
//               instance.mediaData
//             );
//             console.log(instance.mediaData);
//           } else if (instance.colinkData) {
//             console.log(instance.colinkData);
//           }
//         }
//       }
//     ];
//     return cloneDeep(videoSubObserver);
//   };
