<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import * as Phaser from "phaser";
import Level1 from "./phaser/Level1/Level1";
import Welcome from "./phaser/Welcome/Welcome";
import { media } from "./media/userMedia";
import webRTC from "./media/webRTCsample";
import type { GetStreamSettings } from "./media/media";

const localStream = ref<MediaStream>();
const pubVideoEl = ref<HTMLVideoElement>();

const ZOOM_LEVEL = 2;

const SIZE_WIDTH_SCREEN = 800;
const SIZE_HEIGHT_SCREEN = 600;

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT, // 자동으로 화면을 꽉채워줌
  parent: "sprite", //canvas id
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
  autoCenter: Phaser.Scale.CENTER_BOTH, // 화면을 자동으로 센터에 맞추어줌.
  dom: {
    createContainer: true,
  },
  // zoom: ZOOM_LEVEL,
  backgroundColor: "#000000",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [Welcome, Level1], //Level1
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      // debug: true,
    },
  },
};

onMounted(async () => {
  const game = new Phaser.Game(config);
  const canvas = game.canvas;
  // canvas.style.zIndex = "-1";
  const resize = () => {
    const windowRatio = SIZE_WIDTH_SCREEN / SIZE_HEIGHT_SCREEN;
    const gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
      canvas.style.width = SIZE_WIDTH_SCREEN + "px";
      canvas.style.height = SIZE_WIDTH_SCREEN / gameRatio + "px";
    } else {
      canvas.style.width = SIZE_HEIGHT_SCREEN * gameRatio + "px";
      canvas.style.height = SIZE_HEIGHT_SCREEN + "px";
    }
    // game.scale.resize(
    //   window.innerWidth / ZOOM_LEVEL,
    //   window.innerHeight / ZOOM_LEVEL
    // );
  };
  resize();

  window.addEventListener("resize", resize, false);

  //webRTC
  let videoId = "";

  const mediaList = await media.searchDeviceList();
  mediaList?.map((media) => {
    if (media.kind === "videoinput") {
      videoId = media.deviceId;
    }
  });

  const instance = media.GetStream.getInstance();
  const option = {
    video: true,
    audio: false,
    elementKind: "video",
    outputElement: pubVideoEl.value,
  } as GetStreamSettings;
  instance.settings(option);
  localStream.value = await instance.getVideoStream(videoId, 1280, 800);
  const rtcInstance = new webRTC(localStream.value);
  rtcInstance.openPub();
});
</script>

<template>
  <div>
    <div
      id="sprite"
      class="w-full h-full top-0 bottom-0 fixed cursor-cat"
    ></div>
    <div>
      pub
      <video id="pubVideo" ref="pubVideoEl" class="bg-black h-20"></video>
    </div>

    <div>
      sub
      <video id="subVideo" class="bg-black h-20"></video>
    </div>
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped></style>
