<script setup lang="ts">
import Phaser from "phaser";
import Welcome from "@/phaser/Welcome/Welcome";
import { TileObject } from "@/phaser/TileObject/TileObject";
import { Icons } from "@/phaser/IconSprite/Icons";
// import { Finder } from "@/phaser/Test/Finder";
import Character from "@/phaser/Sprites/Character";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { inject, onMounted, onUnmounted, ref } from "vue";
import useFinderStore from "@/stores/finder.store";
import type webRTC from "@/media/webRTCsample";

const ZOOM_LEVEL = 1.2;
const finderStore = useFinderStore();
const emitter: any = inject("emitter");
const remoteVideo = ref<HTMLVideoElement>();
const localVideo = ref<HTMLVideoElement>();
let rtcInstance: webRTC | null = null;

console.log("game: ", finderStore.currentFinders["Game"]);
const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT, // 자동으로 화면을 꽉채워줌
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  parent: "phaser-wrapper", //canvas id
  width: Number(finderStore.currentFinders["Game"].width), // -16
  height: Number(finderStore.currentFinders["Game"].height), // -64
  autoCenter: Phaser.Scale.CENTER_BOTH, // 화면을 자동으로 센터에 맞추어줌.
  dom: {
    createContainer: true,
  },
  zoom: ZOOM_LEVEL,
  backgroundColor: "#000000",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [TileObject, Character], //Level1 Welcome,systemIcons,DropDownTest, Icons 만들기. //
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
onMounted(() => {
  // rtcInstance = new webRTC(remoteVideo.value, localVideo.value);
  const game = new Phaser.Game(config);
  const canvas = game.canvas;
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  // emitter.on("finder:Game", () => {
  //   const config = game.config;
  //   const gameWidth = Number(config.width);
  //   const gameHeight = Number(config.height);
  //   const GameFinderWidth = Number(finderStore.currentFinders["Game"].width);
  //   const GameFinderHeight = Number(finderStore.currentFinders["Game"].height);

  //   const gameRatio = gameWidth / gameHeight;
  //   const finderWidth = GameFinderWidth - 16;
  //   const finderHeight = GameFinderHeight - 64;
  //   const finderRatio = finderWidth / finderHeight;

  //   if (finderRatio < gameRatio) {
  //     canvas.style.width = finderWidth + "px";
  //     canvas.style.height = finderWidth / gameRatio + "px";
  //   }
  // });

  // rtcInstance.openWebSocket();
  // setTimeout(() => {
  //   rtcInstance?.createDataChannel();
  // }, 1000);
});
onUnmounted(() => {
  emitter.off("finder:Game");
  // rtcInstance?.sendMessage("out", "");
  // rtcInstance?.pc?.close();
});
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <div id="phaser-wrapper" class="w-full h-full"></div>
    <!-- <div class="absolute flex flex-row">
      <video ref="localVideo" autoplay class="bg-mac-black h-20 w-20"></video>
      <video ref="remoteVideo" autoplay class="bg-mac-black h-20 w-20"></video>
    </div> -->
  </div>
</template>

<style scoped></style>
