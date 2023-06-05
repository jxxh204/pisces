<script setup lang="ts">
import { ref, inject, defineAsyncComponent, provide, onBeforeMount } from "vue";
import VueResizable from "vue-resizable";
import useFinderStore from "@/stores/finder.store";
import useTabStore from "@/stores/tab.store";

import CloseBox from "@/assets/images/Finder/closebox.png";
import Collapsebox from "@/assets/images/Finder/collapsebox.png";
import ZoomBox from "@/assets/images/Finder/zoombox.svg";
import TabOutlineLeft from "@/assets/images/Finder/tab-outline_left.svg";
import TabOutlineRight from "@/assets/images/Finder/tab-outline_right.svg";
import TabOutlineLeftClick from "@/assets/images/Finder/tab-outline_left_click.svg";
import TabOutlineRightClick from "@/assets/images/Finder/tab-outline_right_click.svg";

import FileIcon from "../Icon/File.Icon.vue";
import Tooltip from "../Tooltip.vue";
import _ from "lodash";
// import type { FileNames, FinderKind } from "@/types/finder";

// import AboutFinder from "@/composition/Finder/About.Finder.vue"
// import GameFinder from "@/composition/Finder/Game.Finder.vue"
// import ProjectsFinder from "@/composition/Finder/Projects.Finder.vue"
// import HomeFinderVue from "@/composition/Finder/Home.Finder.vue"
// import ContactFinder from "@/composition/Finder/Contact.Finder.vue"

const GameFinder = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "GameFinder" */ "@/composition/Finder/Game.Finder.vue"
    )
);
const ProjectsFinder = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectsFinder" */ "@/composition/Finder/Projects.Finder.vue"
    )
);
const HomeFinderVue = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "HomeFinderVue" */ "@/composition/Finder/Home.Finder.vue"
    )
);
const AboutFinder = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "AboutFinder" */ "@/composition/Finder/About.Finder.vue"
    )
);
const ContactFinder = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "ContactFinder" */ "@/composition/Finder/Contact.Finder.vue"
    )
);
// import _ from 'lodash';
interface Props {
  name: FileNames;
  zIndex: number;
  kind: FinderKind;
}

const finderStore = useFinderStore();
const tabStore = useTabStore();

const props = defineProps<Props>();

const emitter: any = inject("emitter");
const finders = finderStore.currentFinders;
const finderLeng = Object.keys(finders).length;

console.log("finder vue");

let finderOption = {
  top: finderLeng * 30,
  left: finderLeng * 30,
  width: 760,
  height: window.innerHeight - 200,
  minWidth: 200,
  minHeight: 250,
  maxWidth: document.body.clientWidth,
  maxheight: document.getElementById("app-body")?.clientHeight,
};
let oldFinderOption = {
  top: finderLeng * 30,
  left: finderLeng * 30,
  width: 760,
  height: window.innerHeight - 200,
  minWidth: 200,
  minHeight: 250,
  maxWidth: document.body.clientWidth,
  maxheight: document.getElementById("app-body")?.clientHeight,
};

onBeforeMount(() => {
  if (document.body.clientWidth < 769) {
    finderOption.left = 0;
    oldFinderOption.left = 0;
    // mobile
    // finderOption.width =
  }
});

let isFullScreen = false;

const onClickFullScreen = () => {
  console.log(isFullScreen, oldFinderOption);
  if (isFullScreen) {
    finderOption = oldFinderOption;
  } else {
    oldFinderOption = _.cloneDeep(finderOption);

    const bodyHeight = document.getElementById("app-body")?.clientHeight;
    finderOption.top = 0;
    finderOption.left = 0;
    if (bodyHeight) finderOption.height = bodyHeight;
    finderOption.width = document.body.clientWidth;
  }
  isFullScreen = !isFullScreen;
};

//파인더 크기를 sm,md, lg, xl 으로 나눠서 폰트크기 조절하기.
const eHandler = (data: any) => {
  finderStore.changeFinderState(
    props.name,
    data.width,
    data.height,
    data.top,
    data.left
  );
  emitter.emit(`finder:${props.name}`, data);
};

const selectComponent = () => {
  console.log(props.name);
  switch (props.name) {
    case "Game":
      return GameFinder;
    case "Projects":
      return ProjectsFinder;
    case "Contact":
      return ContactFinder;
    case "About":
      return AboutFinder;
    case "Home":
      return HomeFinderVue;
    default:
      return HomeFinderVue;
  }
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
    :max-width="finderOption.maxWidth"
    :max-height="finderOption.maxheight"
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
        <Tooltip name="close" class="basis-16 h-full">
          <template v-slot:tooltip>
            <img
              :src="CloseBox"
              @click="finderStore.removeFinder(props.name)"
              class="button_hover transition_basic"
            />
          </template>
        </Tooltip>
        <div class="barPicker"></div>
        <!--          :isClick="isClick" -->
        <file-icon :name="props.name" />
        <p class="">{{ props.name }}</p>
        <div class="barPicker"></div>

        <Tooltip name="fullScreen" class="basis-16 h-full">
          <template v-slot:tooltip>
            <img
              :src="ZoomBox"
              @click="onClickFullScreen"
              class="button_hover transition_basic"
            />
          </template>
        </Tooltip>

        <Tooltip name="collapsebox" class="basis-16 h-full">
          <template v-slot:tooltip>
            <img :src="Collapsebox" class="button_hover transition_basic" />
          </template>
        </Tooltip>
      </section>
      <section
        id="finder_body"
        class="finder_shadow_out bg-mac-white w-full h-full finder_border flex flex-col overflow-auto mac_scroll"
      >
        <!-- tab -->
        <article
          v-if="props.kind === 'tab'"
          id="finder_body_nav"
          class="overflow-x-scroll scrollhide flex-row items-end flex finder_shadow_in h-8 text-center w-full bg-mac-gray-300"
        >
          <!-- item -->
          <div
            v-for="tab in tabStore.Tabs"
            :key="tab.name"
            id="finder_tab"
            class="h-6 flex flex-row font-bold items-end text-clip cursor-select"
            @click="tabStore.onClickTab(tab.name)"
          >
            <!-- :class="tab.click ? 'bg-mac-white' : ' '" -->

            <img v-if="tab.click" :src="TabOutlineLeftClick" />
            <img v-else="tab.click" :src="TabOutlineLeft" />
            <div
              class="whitespace-nowrap truncate border-none"
              :class="
                tab.click ? 'bg-mac-gray-200 tab_click' : 'bg-mac-gray-400 tab'
              "
            >
              {{ tab.name }}
            </div>
            <img v-if="tab.click" :src="TabOutlineRightClick" />
            <img v-else :src="TabOutlineRight" />
          </div>
        </article>

        <!-- normal -->
        <article
          v-else
          id="finder_body_nav"
          class="flex-row flex finder_shadow_in h-6 text-center w-full bg-mac-gray-400 border-2 border-mac-black border-t-0 border-x-0"
        >
          <!-- item -->
          <div class="w-full">item {{ props.kind }}</div>
        </article>
        <article id="finder_body_content" class="w-full h-full overflow-auto">
          <keep-alive>
            <component class="relative" :is="selectComponent()"></component>
          </keep-alive>
          <!-- <GameFinder v-if="props.name === 'Game'" />
          <ProjectsFinder v-if="props.name === 'Projects'" />
          <HomeFinderVue v-if="props.name === 'Home'" />
          <AboutFinder v-if="props.name === 'About'" />
          <ContactFinder v-if="props.name === 'Contact'" /> -->
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
  @apply w-full h-full bg-mac-gray-400 finder_border p-1 flex flex-col gap-1 justify-start;
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
.finder_border {
  @apply border-2 border-mac-black bg-mac-gray-200;
}

.tab {
  border: solid 1px black;
  border-left: none;
  border-right: none;
  font-size: 13.4px;
  image-rendering: auto;
  transition: font-size 0.3s cubic-bezier(0.42, 0, 0.58, 1);
}
.tab_click {
  border-left: none;
  border-right: none;
  border-top: solid 1px black;
  font-size: 13.9px;
  image-rendering: auto;
  transition: font-size 0.3s cubic-bezier(0.42, 0, 0.58, 1);
}
</style>
