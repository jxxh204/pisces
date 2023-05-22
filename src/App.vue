<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Icons } from "@/phaser/IconSprite/Icons";
import { Finder } from "./phaser/Test/Finder";

//안씀.
import Welcome from "./phaser/Welcome/Welcome";
import LoadingView from "./components/Loading/App.Loading.vue";

import NavBar from "./composition/App/NavBar.App.vue";
import Body from "./composition/App/Body.App.vue";

onMounted(async () => {
  // window.addEventListener("resize", resize, false);
  //webRTC 렉때매 잠시 끔.
  //   let videoId = "";
  //   const mediaList = await media.searchDeviceList();
  //   mediaList?.map((media) => {
  //     if (media.kind === "videoinput") {
  //       videoId = media.deviceId;
  //     }
  //   });
  //   const instance = media.GetStream.getInstance();
  //   const option = {
  //     video: true,
  //     audio: false,
  //     elementKind: "video",
  //     outputElement: pubVideoEl.value,
  //   } as GetStreamSettings;
  //   instance.settings(option);
  //   localStream.value = await instance.getVideoStream(videoId, 1280, 800);
  //   // rtcInstance.openSub();
  // });
  // const onClickConnectRTC = () => {
  //   const rtcInstance = new webRTC(localStream.value, subVideoEl.value);
  //   rtcInstance.openWebSocket();
  //   setTimeout(() => {
  //     rtcInstance.openRTC();
  //   }, 1000);
});
</script>

<template>
  <div
    class="w-screen h-screen fixed cursor-default bg-default-pattern bg-cover bg-center"
  >
    <!-- <LoadingView /> -->

    <NavBar />
    <Body />

    <!-- webRTC -->
    <!-- <section class="rtc-modal bg-mac-white rounded-lg p-10">
      webRTC
      <article>
        pub
        <video id="pubVideo" ref="pubVideoEl" class="bg-mac-black h-20"></video>
        <div class="border border-black p-2 rounded-lg">
          <button @click="onClickConnectRTC" class="buttons">접속</button>
        </div>
      </article>

      <article>
        sub
        <video
          id="subVideo"
          ref="subVideoEl"
          class="bg-mac-black h-20"
          autoplay
        ></video>
      </article>
    </section> -->
    <!-- webRTC -->
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
