<script setup lang="ts">
import VueResizable from "vue-resizable";
import BarPicker from "@/assets/images/Finder/barpicker.svg";
import CloseBox from "@/assets/images/Finder/closebox.svg";
import Collapsebox from "@/assets/images/Finder/collapsebox.svg";
import ZoomBox from "@/assets/images/Finder/zoombox.svg";
import sample from "@/assets/images/icons/game.svg";
interface Props {
  Someting: string;
}
const props = defineProps<Props>();

const onClickClose = () => {};
</script>
<template>
  <div class="absolute w-full h-full">
    <!-- :max-width=""
        :max-height="maxH | checkEmpty" -->
    <vue-resizable
      dragSelector=".drag-container"
      :fit-parent="true"
      :top="200"
      :width="400"
      :height="400"
      :min-width="300"
      :min-height="200"
    >
      <div class="resizable-content">
        <section
          id="finder_header"
          class="drag-container h-5 flex flex-row items-center gap-2"
        >
          <img :src="CloseBox" class="button_hover" />
          <div class="barPicker"></div>
          <img :src="sample" />
          <p class="">Finder</p>
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
          <article id="finder_body_content"></article>
        </section>
      </div>
    </vue-resizable>
  </div>
</template>
<style scoped>
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
.finder_shadow_in {
  box-shadow: inset -1px 0px 0px rgba(38, 38, 38, 0.4),
    inset 0px -1px 0px rgba(38, 38, 38, 0.4), inset 1px 0px 0px #ffffff,
    inset 0px 1px 0px #ffffff;
}
.finder_shadow_out {
  box-shadow: -1px 0px 0px rgba(38, 38, 38, 0.4),
    0px -1px 0px rgba(38, 38, 38, 0.4), 1px 0px 0px #ffffff, 0px 1px 0px #ffffff;
}
</style>
