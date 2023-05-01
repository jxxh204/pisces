import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useFinderStore", () => {
  //AddressType을 이후에는 객체로 넣어서 name, index, files 로 하여 내용도 저장하도록.
  const currentFinders = ref<AddressType[]>([]);
  const addFinder = (address: AddressType) => {
    currentFinders.value.push(address);
  };
  const clickFinder = (index: number) => {
    const finder = currentFinders.value.splice(0, index);
    console.log(finder);
    //currentFinders.value.push(finder)
  };
  const removeFinder = (address: AddressType) => {
    // clickFinder(address);
    currentFinders.value.push(address);
  };

  return { addFinder, clickFinder, removeFinder, currentFinders };
});
