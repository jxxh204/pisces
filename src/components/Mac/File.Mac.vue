<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import useFinderStore from "@/stores/finder.store";
import FileIconVue from "../Icon/File.Icon.vue";
import type { FileNames } from "@/types/finder";

interface Props {
  name: string;
}
const props = defineProps<Props>();
const finderStore = useFinderStore();
const macIcon = ref<HTMLDivElement>();
const isClick = ref(false);
const name = props.name as FileNames;

onClickOutside(macIcon, () => (isClick.value = false));
const onClickFile = () => {
  isClick.value = true;
};
</script>

<template>
  <div
    id="macIcon"
    ref="macIcon"
    @click="onClickFile"
    @dblclick="finderStore.addFinder(name)"
    @touchstart="finderStore.addFinder(name)"
    class="flex flex-col justify-center items-center gap-1"
  >
    <!-- <div class="w-full h-full absolute bg-mac-black"></div> -->
    <FileIconVue :name="name" :isClick="isClick" />
    <p
      class="px-1 text-sm"
      :class="isClick ? 'bg-mac-black text-mac-white' : 'bg-mac-Lavender'"
    >
      {{ name }}
    </p>
  </div>
</template>
<style scoped></style>
