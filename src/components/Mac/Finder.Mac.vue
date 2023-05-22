<script setup lang="ts">
import { ref, inject } from "vue";
import VueResizable from "vue-resizable";
import useFinderStore from "@/stores/finder.store";

import CloseBox from "@/assets/images/Finder/closebox.svg";
import Collapsebox from "@/assets/images/Finder/collapsebox.svg";
import ZoomBox from "@/assets/images/Finder/zoombox.svg";
import TabOutlineLeft from "@/assets/images/Finder/tab-outline_left.svg";
import TabOutlineRight from "@/assets/images/Finder/tab-outline_right.svg";

import FileIcon from "../Icon/File.Icon.vue";
import GameFinder from "@/composition/Finder/Game.Finder.vue";
import ProjectsFinder from "@/composition/Finder/Projects.Finder.vue";
const finderStore = useFinderStore();
interface Props {
  name: FileNames;
  zIndex: number;
  kind: FinderKind;
  tabs?: FinderTabs;
}
const props = defineProps<Props>();
const emitter = inject("emitter");
const finderLeng = Object.keys(finderStore.currentFinders).length;
const finderOption = {
  top: window.innerHeight / 2 - 600 / 2 + finderLeng * 20,
  left: window.innerWidth / 2 - 800 / 2 + finderLeng * 20,
  width: 400,
  height: 300,
  minWidth: 200,
  minHeight: 100,
};

const eHandler = (data: any) => {
  console.log(data);
  finderStore.changeFinderState(
    props.name,
    data.width,
    data.height,
    data.top,
    data.left
  );
  emitter.emit(`finder:${props.name}`);
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
    :top="finderOption.top"
    :left="finderOption.left"
    :width="finderOption.width"
    :height="finderOption.height"
    :min-width="finderOption.minWidth"
    :min-height="finderOption.minHeight"
    :style="'z-index:' + props.zIndex"
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
          v-if="props.kind === 'tab'"
          id="finder_body_nav"
          class="overflow-x-hidden flex-row flex finder_shadow_in h-8 text-center w-full bg-mac-gray-400 border-2 border-mac-black border-t-0 border-x-0"
        >
          <!-- item -->
          <div
            v-for="tab in props.tabs"
            :key="tab"
            id="finder_tab"
            class="flex flex-row font-bold items-end text-clip object-contains"
          >
            <img :src="TabOutlineLeft" />
            <div class="tab whitespace-nowrap">
              {{ tab }}
            </div>
            <img :src="TabOutlineRight" />
          </div>
        </article>

        <article
          v-else
          id="finder_body_nav"
          class="flex-row flex finder_shadow_in h-6 text-center w-full bg-mac-gray-400 border-2 border-mac-black border-t-0 border-x-0"
        >
          <!-- item -->
          <div class="w-full">item {{ props.kind }}</div>
        </article>
        <article id="finder_body_content">
          <GameFinder v-if="props.name === 'Game'" />
          <ProjectsFinder v-if="props.name === 'Projects'" />
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

.tab {
  border: solid 1px black;
  border-left: none;
  border-right: none;
  font-size: 13.4px;
  transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);
}
</style>
