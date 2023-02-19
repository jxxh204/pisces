import { ref } from "vue";
import { defineStore } from "pinia";

export const useFinderAddressStore = defineStore("finderAddress", () => {
  const currentAddress = ref<AddressType>("");
  const moveAddress = (address: AddressType) => {
    currentAddress.value = address;
  };
  const getAddress = () => currentAddress.value;

  return { getAddress, moveAddress };
});
