<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

interface Props {
  img: ImageData;
  name: string;
}
const props = defineProps<Props>();
const macIcon = ref<HTMLDivElement>();
const isClick = ref(false);

onClickOutside(macIcon, () => (isClick.value = false));
const onClickFile = () => {
  console.log("onClickFile");
  isClick.value = true;
};
const onDblClick = () => {
  console.log("onDblClick");
};
</script>

<template>
  <div
    id="macIcon"
    ref="macIcon"
    @click="onClickFile"
    @dblclick="onDblClick"
    class="flex flex-col justify-center items-center gap-1"
  >
    <!-- <div class="w-full h-full absolute bg-mac-black"></div> -->
    <img :src="props.img" :class="isClick ? 'brightness-[.2]' : ''" />
    <p
      class="px-1 text-sm"
      :class="isClick ? 'bg-mac-black text-mac-white' : 'bg-mac-Lavender'"
    >
      {{ props.name }}
    </p>
  </div>
</template>
<style scoped></style>
