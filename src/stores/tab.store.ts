import { ref } from "vue";
import { defineStore } from "pinia";

import Coplay2023 from "@/assets/images/projects/coplay2023_main.svg";
import Coplay from "@/assets/images/projects/coplay_main.svg";
import HelloMars from "@/assets/images/projects/HelloMars.svg";
import Blockbot from "@/assets/images/projects/blockbot.svg";
import LAL from "@/assets/images/projects/LAL.svg";

import type { TabComponent, TabComponentType, TabName } from "@/types/store";

export default defineStore("useTabStore", () => {
  const Tabs = ref<TabComponentType>({
    Coplay2023: {
      name: "Coplay2023",
      image: Coplay2023,
      description: "",
      tags: ["Electron"],
      click: true,
      link: "notion://forest-torta-822.notion.site/CoPlay-2023-8199f382bbf14fe096162ce9a13b23d7",
    },
    Coplay: {
      name: "Coplay",
      image: Coplay,
      description: "",
      tags: ["Electron"],
      click: false,
      link: "notion://forest-torta-822.notion.site/CoPlay-2022-01-10-07-65c540a4748e49daa5ecbd19f1245ad2",
    },
    "hello-mars": {
      name: "hello-mars",
      image: HelloMars,
      description: "",
      tags: ["Electron"],
      click: false,
      link: "notion://forest-torta-822.notion.site/HELLO-MARS-2021-06-2021-11-10-e28e8285196d4e538ba7a2907a1008e1",
    },
    blockbot: {
      name: "blockbot",
      image: Blockbot,
      description: "",
      tags: ["Electron"],
      click: false,
      link: "notion://forest-torta-822.notion.site/BlockBot-b00ec237ee51431dafed0b08377799e8",
    },
    "layer-after-layer": {
      name: "layer-after-layer",
      image: LAL,
      description: "",
      tags: ["Electron"],
      click: false,
      link: "https://forest-torta-822.notion.site/LAYER-after-LAYER-f28ce6c04b824aba93f766b1491d062c",
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
