<script setup lang="ts">
import { onMounted, ref } from "vue";

import LoadingView from "./components/Loading/App.Loading.vue";

import NavBar from "./composition/App/NavBar.App.vue";
import Body from "./composition/App/Body.App.vue";
import AlertVue from "./components/Alert/Alert.vue";
import deepLink from "@/module/deepLink";

onMounted(async () => {
  console.log(deepLink.mobile_chk());
});
</script>

<template>
  <div
    class="w-screen h-screen fixed cursor-default bg-default-pattern bg-center flex flex-col"
  >
    <LoadingView />
    <NavBar />
    <AlertVue />
    <Body />
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped>
/* .buttons {
  @apply bg-white px-2 hover:bg-slate-300 transition-all duration-200 rounded-lg;
} */
.rtc-modal {
  /* left: 50%; */
  right: 0;
  top: 30%;
  transform: translate(-50%, -50%);
  position: absolute;
}
body {
  overflow: auto !important;
}

.phaser-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
