import { ref } from "vue";
import { defineStore } from "pinia";
import type { FinderComponentType, FileNames } from "@/types/store";

export default defineStore("useFinderStore", () => {
  const currentFinders = ref<FinderComponentType>();
  const finderLength = ref(10);

  const addFinder = (name: FileNames) => {
    if (currentFinders.value?.[name]) {
      clickFinder(name);
      return;
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
    if (currentFinders.value) {
      currentFinders.value[name].width = width;
      currentFinders.value[name].height = height;
      currentFinders.value[name].top = top;
      currentFinders.value[name].left = left;
    }
  };

  return {
    addFinder,
    clickFinder,
    removeFinder,
    changeFinderState,
    currentFinders,
  };
});
