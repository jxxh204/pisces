<script setup lang="ts">
import { useElementHover } from "@vueuse/core";
import { ref, onMounted } from "vue";
import deepLink from "@/module/deepLink";

interface Props {
  image: string;
  link: string;
}
const props = defineProps<Props>();
const projeftImage = ref<HTMLElement>();
const mainImage = ref<HTMLImageElement>();
const isImageHover = useElementHover(projeftImage);

const mouseOut = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement;
  target.style.opacity = "0";
};

const onClickImage = () => {
  //   window.open(props.link, "_blank");
  deepLink.participate(props.link, "notion");
};
onMounted(() => {
  deepLink.mobile_chk();
});
</script>
<template>
  <article
    id="project_image"
    ref="projeftImage"
    class="relative w-full lg:max-w-2xl border-[1px] border-mac-black flex flex-col items-center bg-default-pattern shadow-lg"
  >
    <div
      class="project_image_tab border-t-[1px] border-mac-gray-300 w-full h-1"
    ></div>
    <img
      ref="mainImage"
      class="object-cover w-full h-full p-2"
      :src="props.image"
    />
    <Transition>
      <div
        class="absolute w-full h-full top-0 left-0 bg-mac-Azul mono-lg-bold bg-opacity-50 text-mac-white transition_basic"
        @mouseleave="mouseOut"
        v-if="isImageHover"
      >
        <p
          class="cursor-select w-full h-full flex flex-col justify-center items-center"
          @click="onClickImage"
        >
          <span class="animate-bounce mb-9 absolute">↓</span>Click More!
        </p>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.project_image_tab {
  background: #ffffff;
  box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5), inset 0px -1px 0px #262626;
}
</style>
