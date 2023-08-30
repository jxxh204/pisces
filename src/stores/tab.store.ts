import { ref } from "vue";
import { defineStore } from "pinia";

import Coplay2023 from "@/assets/images/projects/coplay2023_main.jpg";
import Coplay from "@/assets/images/projects/coplay_main.jpg";
import HelloMars from "@/assets/images/projects/HelloMars.jpg";
import Blockbot from "@/assets/images/projects/blockbot.jpg";
import LAL from "@/assets/images/projects/LAL.svg";
import Developic from "@/assets/images/projects/developic.png";

// import type { TabComponent, TabComponentType, TabName } from "@/types/finder";

export default defineStore("useTabStore", () => {
  const Tabs = ref<TabComponentType>({
    Coplay2023: {
      name: "Coplay2023",
      image: Coplay2023,
      responsibilities:
        "실시간 영상 통신 & 로봇 통신 담당, 회사 자체 솔루션 서버를 이용하여 Pub & Sub, P2P 통신을 하는 웹을 주로 개발하고 웹과 로봇이 ble 혹은 원격 통신을 하여 로봇을 제어하는 기능을 구현하였다.",
      tags: ["Vue3", "WebWorker", "WebCodec", "CI", "TEST"],
      click: true,
      link: "https://jamkim.notion.site/CoPlay-2023-8199f382bbf14fe096162ce9a13b23d7",
    },
    Coplay: {
      name: "Coplay",
      image: Coplay,
      responsibilities:
        "실시간 영상 통신 & 로봇 통신 담당, 회사 자체 솔루션 서버를 이용하여 Pub & Sub, P2P 통신을 하는 웹을 주로 개발했습니다. 원격에서 메인 컴퓨터로 접속하여 로봇 제어 데이터를 보내면 메인 컴퓨너와 연결되어있는 ble 로봇을 제어하는 기능을 구현했습니다.",
      tags: [
        "Vue3",
        "WebWorker",
        "WebCodec",
        "WebBluetooth",
        "CI",
        "TEST",
        "Amplify",
        "GraphQL",
        "Tailwindcss",
        "TypeScript",
      ],
      click: false,
      link: "https://jamkim.notion.site/CoPlay-2022-01-10-07-65c540a4748e49daa5ecbd19f1245ad2",
      reference: "https://www.coplay.kr/",
    },
    "hello-mars": {
      name: "hello-mars",
      image: HelloMars,
      responsibilities:
        "webRTC를 사용하여 실시간으로 RC CAR를 조종하는 웹사이트를 개발했습니다. 컨트롤하는 화면의 설명으로는 게임 처럼 사용자의 얼굴, 전체 맵카메라, RC CAR의 카메라를 한 화면에 보여줄 수 있도록 제작하였고 전체적으로 개발은 웹을 이용하여 기본 홈페이지를 만들고 로그인 + 예약 + webRTC를 이용한 자동차 제어를 제작했습니다.",
      tags: ["Vue3", "WebRTC", "RestAPI"],
      click: false,
      link: "https://jamkim.notion.site/HELLO-MARS-2021-06-2021-11-10-e28e8285196d4e538ba7a2907a1008e1",
      reference: "https://www.cojam.kr/",
    },
    blockbot: {
      name: "blockbot",
      image: Blockbot,
      responsibilities:
        "Scratch3를 Electron으로 빌드하여 데스크탑 어플리케이션화 시켜 하나의 앱을 만들었고 앱의 역할은 프록시 서버와 통신하여 블록봇이라는 로봇을 블루투스로 제어하는 소프트웨어를 만들었습니다. React, Redux, JS, Electron 등이 사용되었으며  데이터베이스를 사용하지 않았기 때문에 Json과 로봇을 이용하여 데이터를 관리했습니다.",
      tags: ["React & Redux", "Electron"],
      click: false,
      link: "https://jamkim.notion.site/BlockBot-b00ec237ee51431dafed0b08377799e8",
      reference: "https://www.wadiz.kr/web/campaign/detail/90553",
    },
    Developic: {
      name: "Developic",
      image: Developic,
      responsibilities:
        "프로덕트 디자이너1, 백엔드 개발자2와 프론트엔드개발자인 저를 포함한 총 4명의 인원으로 시작된 프로젝트입니다. 해당 서비스 GPT API를 사용하여 개발자들에게 언어와 난이도에 맞는 리팩토링 과제를 던져주어 리팩토링 공부를 할 수 있도록 도와주는 서비스입니다.",
      tags: [
        "TypeScript",
        "React & Recoil",
        "StyledComponent",
        "Tailwindcss",
        "yarn berry(pnp)",
        "playwright",
      ],
      click: false,
      link: "https://jamkim.notion.site/Developic-ba54e468df8948a5b767ce928dc1e64d?pvs=4",
      code: "https://github.com/dhr05074/code-connect/tree/Front/front",
    },
    "layer-after-layer": {
      name: "layer-after-layer",
      image: LAL,
      responsibilities:
        "디자이너와 협업하여 2주간 만든 반응형 웹사이트로 여러 작가들이 홍대 인근에서 진행하는 플리마켓 및 전시 행사를 위한 소개  페이지입니다. VanillaJS, css, html를 사용하여 간단하게 만들었습니다.",
      tags: ["VanillaJS", "SideProject"],
      click: false,
      link: "https://jamkim.notion.site/LAYER-After-LAYER-b6bdc991d8e141bd9f573e7a54e0268a?pvs=4",
      demo: "https://jxxh204.github.io/LAYER-after-LAYER/",
    },
  });
  const currentTab = ref<TabComponent>(Tabs.value.Coplay2023);

  const onClickTab = (name: TabName) => {
    let tab: TabName = "Coplay";
    for (tab in Tabs.value) {
      if (Tabs.value[tab].name === name) {
        Tabs.value[tab].click = true;
        currentTab.value = Tabs.value[tab];
      } else {
        Tabs.value[tab].click = false;
      }
    }
  };

  return {
    Tabs,
    currentTab,
    onClickTab,
  };
});
