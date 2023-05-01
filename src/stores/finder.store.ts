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
    currentFinders.value[name].zIndex = finderLength.value++;
  };
  const removeFinder = (address: FinderComponentType) => {
    // clickFinder(address);
    // currentFinders.value.push(address);
  };

  return { addFinder, clickFinder, removeFinder, currentFinders };
});
