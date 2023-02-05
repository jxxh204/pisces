<script setup lang="ts">
import StartingIcon from "@/assets/images/icons/startup-icon.png";
import Welcome_modal from "@/assets/images/Welcome_modal.png";
import { onMounted, ref } from "vue";
import { promiseTimeout, useTimeout } from "@vueuse/core";
import ProgressBar from "@/assets/images/ProgressBar.png";

// const start = useTimeout(1000); // 1초뒤 true
// const isStartingIcon = useTimeout(1000);
const { ready, start, stop } = useTimeout(1000, { controls: true });

type LoadingTypes = "start" | "starting" | "welcome";

const loadingType = ref<LoadingTypes>("start");
const isStartingIcon = ref(true);
const isProgressBar = ref(false);
onMounted(async () => {
  await promiseTimeout(1200);
  if (ready.value) {
    isStartingIcon.value = false;
  }
  await promiseTimeout(1200);
  if (ready.value) {
    loadingType.value = "starting";
  }
  await promiseTimeout(1200);
  if (ready.value) {
    isProgressBar.value = true;
  }
});
</script>
<template>
  <div
    v-if="loadingType === 'start'"
    class="loading bg-mac-gray-700 flex flex-row justify-center items-center transition-all"
  >
    <img v-if="isStartingIcon" :src="StartingIcon" class="h-[6%]" />
  </div>
  <div
    v-else-if="loadingType === 'starting'"
    class="starting loading flex flex-row justify-center items-center transition-all"
  >
    <img :src="Welcome_modal" class="h-[50%]" />
    <p
      v-if="!isProgressBar"
      class="font-[Charcoal] fixed top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      Welcome to Jam OS
    </p>
    <div
      class="font-[Charcoal] fixed top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2"
      v-else
    >
      <p>Starting Up...</p>
      <img :src="ProgressBar" />
    </div>
  </div>
</template>

<style scoped>
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
.loading {
  margin: 0;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @apply cursor-watch;
}
.starting {
  background-image: url("@/assets/images/bg/bg-loading.png");
  background-size: cover;
}
</style>
