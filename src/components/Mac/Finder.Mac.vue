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
</script>
<template>
  <div class="absolute w-screen h-screen">
    <!-- :max-width=""
        :max-height="maxH | checkEmpty" -->
    <vue-resizable
      dragSelector=".drag-container"
      :fit-parent="true"
      :top="100"
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
          <img :src="CloseBox" />
          <div class="barPicker"></div>
          <article class="flex flex-row gap-2 h-full w-full">
            <img :src="sample" />
            <p class="">Finder</p>
          </article>
          <div class="barPicker"></div>
          <article class="flex flex-row h-full w-full">
            <img :src="ZoomBox" />
            <img :src="Collapsebox" />
          </article>
        </section>
        <section
          id="finder_body"
          class="bg-mac-white w-full h-full border-2 border-mac-black"
        ></section>
      </div>
    </vue-resizable>
  </div>
</template>
<style scoped>
.resizable-content {
  @apply w-full h-full bg-mac-gray-400 border-mac-black border-2 p-1 flex flex-col gap-1 justify-start;
}
#finder_header img {
  @apply h-full;
}
.barPicker {
  @apply h-full w-full bg-cover bg-barPicker;
}
</style>
