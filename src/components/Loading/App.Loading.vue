<script setup lang="ts">
import StartingIcon from "@/assets/images/icons/startup-icon.png";
import Welcome_modal from "@/assets/images/Welcome_modal.png";
import { onMounted, ref } from "vue";
import { promiseTimeout, useTimeout } from "@vueuse/core";
import ProgressBar from "@/assets/images/ProgressBar.png";
import useFinderStore from "@/stores/finder.store";

// const start = useTimeout(1000); // 1초뒤 true
// const isStartingIcon = useTimeout(1000);
const { ready, start, stop } = useTimeout(1000, { controls: true });

type LoadingTypes = "initial" | "welcome" | "progress" | "button" | "none";

const loadingType = ref<LoadingTypes>("initial");
const isStartingIcon = ref(true);
const progressPercent = ref(0);
const progressInterval = ref<number>(0);
const finderStore = useFinderStore();

const onClickStart = () => {
  loadingType.value = "none";
  finderStore.addFinder("Home");
};
onMounted(async () => {
  await promiseTimeout(1200);
  if (ready.value) {
    isStartingIcon.value = false;
  }
  await promiseTimeout(1200);
  if (ready.value) {
    loadingType.value = "welcome";
  }
  await promiseTimeout(1200);
  if (ready.value) {
    loadingType.value = "progress";
    progressInterval.value = window.setInterval(() => {
      progressPercent.value++;
      console.log(
        "🚀 ~ file: LoadingView.vue:39 ~ progressInterval.value=setInterval ~ progressPercent.value",
        progressPercent.value
      );

      if (progressPercent.value > 99) {
        clearInterval(progressInterval.value);
        loadingType.value = "button";
      }
    }, 20);
  }
});
</script>
<template>
  <Transition name="fade">
    <div
      v-if="loadingType === 'initial'"
      class="loading bg-mac-gray-700 flex flex-row justify-center items-center transition_basic ㅋ-"
    >
      <img v-if="isStartingIcon" :src="StartingIcon" class="h-[6%]" />
    </div>
    <!-- start -->
    <div
      v-else-if="
        loadingType === 'welcome' ||
        loadingType === 'progress' ||
        loadingType === 'button'
      "
      class="starting loading flex flex-row justify-center items-center transition_basic"
    >
      <img :src="Welcome_modal" class="h-[50%]" />
      <p
        v-if="loadingType === 'welcome'"
        class="font-[Charcoal] fixed top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <!-- Welcome to -->
        Jam.Kim Portfolio
      </p>
      <div
        class="font-[Charcoal] w-40 fixed top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2"
        v-if="loadingType === 'progress'"
      >
        <p>Starting Up...</p>
        <div class="w-full">
          <div class="w-full rounded-full h-2.5">
            <img class="absolute w-full h-3" :src="ProgressBar" />
            <div
              class="h-3 rounded-full absolute bg-gradient-to-b from-mac-Azul via-mac-white to-mac-Azul"
              :style="`width:${progressPercent}%`"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-if="loadingType === 'button'"
        class="font-[Charcoal] fixed top-[69%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          @click="onClickStart"
          class="mono-lg-light flex flex-row justify-center items-center"
        >
          Start
        </button>
      </div>
    </div>
  </Transition>

  <!-- starting -->
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
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @apply cursor-watch;
}
/* .starting {
  background-image: url("@/assets/images/bg/background.png");
  background-size: cover;
} */
</style>
