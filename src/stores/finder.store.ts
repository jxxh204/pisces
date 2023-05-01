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

  return { addFinder, clickFinder, removeFinder, currentFinders };
});
