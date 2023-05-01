<script setup lang="ts">
import { ref, inject } from "vue";
import VueResizable from 'vue-resizable';
import useFinderStore from "@/stores/finder.store";

import CloseBox from "@/assets/images/Finder/closebox.svg";
import Collapsebox from "@/assets/images/Finder/collapsebox.svg";
import ZoomBox from "@/assets/images/Finder/zoombox.svg";
import sample from "@/assets/images/icons/game.svg";
import FileIcon from "../Icon/File.Icon.vue";
import GameFinder from "@/composition/Finder/Game.Finder.vue"
const finderStore = useFinderStore();
interface Props {
    name: FileNames;
    zIndex:number;
}
const props = defineProps<Props>();
const emitter = inject('emitter');

const eHandler =(data:any) => {

    // width.value = data.width;
    // height.value = data.height;
    // left.value = data.left;
    // top.value = data.top;
    // event.value = data.eventName;
    finderStore.changeFinderState(props.name,data.width,data.height,data.top,data.left)
    emitter.emit(`finder:${props.name}`)
}
const onClickClose = () => {
  finderStore.removeFinder();
};

// 이미지는 icon.vue를 만들어서 모두 거기서 불러오도록 하자.
</script>
<template>
  <!-- :max-width=""
        :max-height="maxH | checkEmpty" -->
  <vue-resizable

    id="resizable"
    dragSelector=".drag-container"
    :fit-parent="true"
    :top="200"
    :width="400"
    :height="300"
    :min-width="300"
    :min-height="200"
    :style="'z-index:' +props.zIndex"
    @mount="eHandler"
    @resize:move="eHandler"
    @resize:start="eHandler"
    @resize:end="eHandler"
    @drag:move="eHandler"
    @drag:start="eHandler"
    @drag:end="eHandler"
  >
    <div class="resizable-content">
      <section
        id="finder_header"
        class="drag-container h-5 flex flex-row items-center gap-2"
      >
        <img
          :src="CloseBox"
          @click="finderStore.removeFinder(props.name)"
          class="button_hover"
        />
        <div class="barPicker"></div>
<!--          :isClick="isClick" -->
        <file-icon :name="props.name" />
        <p class="">{{ props.name }}</p>
        <div class="barPicker"></div>

        <img :src="ZoomBox" class="button_hover" />
        <img :src="Collapsebox" class="button_hover" />
      </section>
      <section
        id="finder_body"
        class="finder_shadow_out bg-mac-white w-full h-full finder_boder flex flex-col"
      >
        <article
          id="finder_body_nav"
          class="finder_shadow_in h-6 text-center w-full bg-mac-gray-400 border-2 border-mac-black border-t-0 border-x-0"
        >
          item
        </article>
        <article id="finder_body_content">
            <GameFinder v-if="props.name === 'Game'" />
        </article>
      </section>
    </div>
  </vue-resizable>
</template>
<style scoped>
#resizable {
  position: absolute;
}
.resizable-content {
  @apply w-full h-full bg-mac-gray-400 finder_boder p-1 flex flex-col gap-1 justify-start;
}
#finder_header img {
  @apply h-full;
}
.barPicker {
  @apply h-full w-full bg-cover bg-barPicker;
}
.button_hover:hover {
  @apply cursor-select brightness-[0.3];
}
.finder_boder {
  @apply border-2 border-mac-black;
}
</style>
