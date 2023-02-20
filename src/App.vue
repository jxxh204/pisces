<script setup lang="ts">
import { onMounted, ref } from "vue";

import * as Phaser from "phaser";
import Character from "./phaser/Sprites/Character";

import { Icons } from "@/phaser/IconSprite/Icons";
import { Finder } from "./phaser/Test/Finder";

//안씀.
import Welcome from "./phaser/Welcome/Welcome";
import { DropDownTest, ModalDialog } from "./phaser/Test/Test";
import { media } from "./media/userMedia";
import webRTC from "./media/webRTCsample";
import type { GetStreamSettings } from "./media/media";
import { v4 as uuidv4 } from "uuid";
//
import LoadingView from "./views/LoadingView.vue";

import MenuBar from "./components/MenuBar.vue";
//phaser plugin
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { TileObject } from "./phaser/TileObject/TileObject";

const localStream = ref<MediaStream>();
const pubVideoEl = ref<HTMLVideoElement>();
const subVideoEl = ref<HTMLVideoElement>();
const inputName = ref<HTMLInputElement>();

const ZOOM_LEVEL = 1;

const SIZE_WIDTH_SCREEN = window.innerWidth;
const SIZE_HEIGHT_SCREEN = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT, // 자동으로 화면을 꽉채워줌
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "phaser-wrapper", //canvas id
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
  autoCenter: Phaser.Scale.CENTER_BOTH, // 화면을 자동으로 센터에 맞추어줌.
  dom: {
    createContainer: true,
  },
  zoom: ZOOM_LEVEL,
  backgroundColor: "#000000",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [TileObject, Icons, Finder, Character], //Level1 Welcome,systemIcons,DropDownTest 만들기. //
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      // debug: true,
    },
  },
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
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
    game.scale.resize(
      window.innerWidth / ZOOM_LEVEL,
      window.innerHeight / ZOOM_LEVEL
    );
  };
  // resize();

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
  //   const rtcInstance = new webRTC(localStream.value, subVideoEl.value, uuidv4());
  //   rtcInstance.openWebSocket();
  //   setTimeout(() => {
  //     rtcInstance.openRTC();
  //   }, 1000);
});
</script>

<template>
  <div class="w-screen h-screen fixed">
    <!-- <LoadingView /> -->
    <MenuBar />
    <div
      id="phaser-wrapper"
      class="w-full h-full top-0 bottom-0 fixed cursor-cat -z-20"
    ></div>
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
