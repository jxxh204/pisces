import { ref } from "vue";
import { defineStore } from "pinia";
import Observer from "@/module/observer";

export const useFinderAddressStore = defineStore("finderAddress", () => {
  const currentAddress = ref<AddressType>("");
  const moveAddress = (address: AddressType) => {
    console.log(
      "🚀 ~ file: store_finderAddress.ts:8 ~ moveAddress ~ moveAddress",
      address
    );
    const observer = Observer.getInstance();
    observer.notifyObserver("finder_address", address);
    currentAddress.value = address;
  };
  const getAddress = () => currentAddress.value;

  return { getAddress, moveAddress };
});
