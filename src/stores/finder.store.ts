import { ref } from "vue";
import { defineStore } from "pinia";
// import type { FinderComponentType, FileNames } from "@/types/finder";
import useAlertStore from "@/stores/alert.store";
import deepLink from "@/module/deepLink";

export default defineStore("useFinderStore", () => {
  const currentFinders = ref({} as FinderComponentType);
  const finderLength = ref(10);

  const addFinder = (name: FileNames) => {
    const alertStore = useAlertStore();
    if (currentFinders.value?.[name]) {
      clickFinder(name);
      return;
    }
    if (name === "Game" && import.meta.env.PROD) {
        console.log(deepLink.mobile_chk())
      if(deepLink.mobile_chk() !== 'pc'){
        alertStore.onAlert("모바일은 지원하지 않습니다.");
        return;
      }
    }

    if (currentFinders.value) {
      currentFinders.value[name] = {
        name,
        zIndex: finderLength.value,
      };
      if (name === "Projects") {
        currentFinders.value[name].kind = "tab";
      } else if (name === "Contact") {
        currentFinders.value[name].kind = "list";
      } else {
        currentFinders.value[name].kind = "normal";
      }
      finderLength.value++;

      console.log(currentFinders.value);
    }
  };
  const clickFinder = (name: FileNames) => {
    try {
      if (currentFinders.value)
        currentFinders.value[name].zIndex = finderLength.value++;
    } catch {
      console.log("clickFinder : removeError");
    }
  };
  const removeFinder = (name: FileNames) => {
    if (currentFinders.value) delete currentFinders.value[name];
  };
  const changeFinderState = (
    name: FileNames,
    width: number,
    height: number,
    top: number,
    left: number
  ) => {
    // if (currentFinders.value) {
    currentFinders.value[name].width = width;
    currentFinders.value[name].height = height;
    currentFinders.value[name].top = top;
    currentFinders.value[name].left = left;
    // }
  };

  return {
    addFinder,
    clickFinder,
    removeFinder,
    changeFinderState,
    currentFinders,
  };
});
