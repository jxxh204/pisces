import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useFinderStore", () => {
  const currentFinders = ref<FinderComponentType>({});
  const finderLength = ref(10);
  const addFinder = (name: FileNames) => {
    if (currentFinders.value?.[name]) {
      clickFinder(name);
      return;
    }
    currentFinders.value[name] = {
      name,
      zIndex: finderLength.value,
    };
    finderLength.value++;

    console.log(currentFinders.value);
  };
  const clickFinder = (name: FileNames) => {
    try {
      currentFinders.value[name].zIndex = finderLength.value++;
    } catch {
      console.log("clickFinder : removeError");
    }
  };
  const removeFinder = (name: FileNames) => {
    delete currentFinders.value[name];
  };
  const changeFinderState = (name:FileNames, width:number,height:number,top:number,left:number) => {
    currentFinders.value[name].width = width
    currentFinders.value[name].height = height
    currentFinders.value[name].top = top
    currentFinders.value[name].left = left

  }

  return { addFinder, clickFinder, removeFinder,changeFinderState, currentFinders };
});
