<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import useFinderStore from "@/stores/finder.store";
import FileIconVue from "../Icon/File.Icon.vue";

interface Props {
  name: FileNames;
}
const props = defineProps<Props>();
const finderStore = useFinderStore();
const macIcon = ref<HTMLDivElement>();
const isClick = ref(false);

onClickOutside(macIcon, () => (isClick.value = false));
const onClickFile = () => {
  isClick.value = true;
};
const onDblClick = (name: FileNames) => {
  finderStore.addFinder(name);
};
</script>

<template>
  <div
    id="macIcon"
    ref="macIcon"
    @click="onClickFile"
    @dblclick="onDblClick(props.name)"
    class="flex flex-col justify-center items-center gap-1"
  >
    <!-- <div class="w-full h-full absolute bg-mac-black"></div> -->
    <FileIconVue :name="props.name" :isClick="isClick" />
    <p
      class="px-1 text-sm"
      :class="isClick ? 'bg-mac-black text-mac-white' : 'bg-mac-Lavender'"
    >
      {{ props.name }}
    </p>
  </div>
</template>
<style scoped></style>
