import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useTabStore", () => {
  const TabNames = ref<TabNames[]>([
    { name: "Coplay", click: true },
    { name: "hello-mars", click: false },
    { name: "blockbot", click: false },
    { name: "layer-after-layer", click: false },
  ]);
  const currentTabs = ref<TabComponentType>({});

  const onClickTab = (name: string) => {
    console.log(name);

    for (let tab of TabNames.value) {
      if (tab.name === name) {
        tab.click = true;
      } else {
        tab.click = false;
      }
    }
  };

  return {
    TabNames,
    onClickTab,
  };
});
