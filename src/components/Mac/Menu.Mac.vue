5
<script setup lang="ts">
import FirstButton from "@/assets/images/Menu/firstButton.svg";
import LeftButton from "@/assets/images/Menu/LeftButton.svg";
import LastButton from "@/assets/images/Menu/lastButton.svg";
import Arrow from "@/assets/images/Menu/arrows.svg";
import FileIcon from "../Icon/File.Icon.vue";

import useFinderStore from "@/stores/finder.store";

const finderStore = useFinderStore();
</script>

<template>
  <div class="flex flex-row fixed left-0 bottom-0 h-9">
    <img :src="FirstButton" class="h-full" />
    <img :src="LeftButton" class="h-full" />
    <div
      id="menus"
      v-for="finder in finderStore.currentFinders"
      @click="finderStore.clickFinder(finder.name)"
      class="h-full border-y-2 border-r-2 border-mac-black bg-mac-gray-400 flex flex-row justify-between items-center gap-1 menu_shadow_in px-1 py-2"
    >
      <FileIcon :name="finder.name" class="h-6" />
      <img :src="Arrow" class="h-3" />
    </div>
    <img :src="LeftButton" class="-scale-x-100 h-full" />
    <img :src="LastButton" class="h-full" />
  </div>
</template>

<style scoped>
.menu_shadow_in {
  box-shadow: inset -3px 0px 0px rgba(38, 38, 38, 0.4),
    inset 0px -3px 0px rgba(38, 38, 38, 0.4), inset 3px 0px 0px #ffffff,
    inset 0px 3px 0px #ffffff;
}
.menu_shadow_in:hover {
  @apply bg-mac-gray-700 cursor-select;
  box-shadow: 1px 1px 0px #262626, inset -2px 0px 0px #c0c0c0,
    inset 0px -2px 0px #c0c0c0, inset 2px 0px 0px #262626,
    inset 0px 2px 0px #404040;
}
</style>
