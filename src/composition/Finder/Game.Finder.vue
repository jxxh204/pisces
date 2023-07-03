<script setup lang="ts">
import Welcome from "@/phaser/Welcome/Welcome";
import { Icons } from "@/phaser/IconSprite/Icons";
// import { Finder } from "@/phaser/Test/Finder";
import Game1 from "@/phaser/Scene/Game1";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { inject, onMounted, onUnmounted, ref } from "vue";
import useFinderStore from "@/stores/finder.store";
import type webRTC from "@/media/webRTCsample";

const ZOOM_LEVEL = 1;
const finderStore = useFinderStore();
const emitter: any = inject("emitter");
const remoteVideo = ref<HTMLVideoElement>();
const localVideo = ref<HTMLVideoElement>();
  const isPlay = ref<boolean>(false);
let rtcInstance: webRTC | null = null;
let game:null | Phaser.Game = null;

console.log("game: ", finderStore.currentFinders["Game"]);
const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT, // 자동으로 화면을 꽉채워줌
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  parent: "phaser-wrapper", //canvas id
  width: 1920, // -16
  height: 1280, // -64
  autoCenter: Phaser.Scale.CENTER_BOTH, // 화면을 자동으로 센터에 맞추어줌.
  dom: {
    createContainer: true,
  },
  zoom: ZOOM_LEVEL,
  backgroundColor: "#000000",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [Game1], //Level1 Welcome,systemIcons,DropDownTest, Icons 만들기. //
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
   game = new Phaser.Game(config);

  const canvas = game.canvas;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.objectFit = "contain";
  canvas.style.padding = "2rem 0";
});
onUnmounted(() => {
  game?.destroy(true);
  game = null;
  // rtcInstance?.sendMessage("out", "");
  // rtcInstance?.pc?.close();
});
const onClickPlay = () => {
  isPlay.value = true;
}
const onClickQuit = () => {
  finderStore.removeFinder("Game")
}
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <Transition name="deep-fade">
    <div v-if="!isPlay" id="phaser-titleScreen" class="w-full h-full bg-mac-black z-50 flex flex-col justify-center items-center font-Monocraft gap-4 absolute">
      <h1 class="text-mac-white text-3xl drop-shadow-sm mb-10">TEST GAME</h1>
      <section class="w-28  text-center cursor-pointer buttonUi" @click="onClickPlay" >
        <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 rounded-t-sm">Play
        </div>
        <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
      </section>
    <section class="w-28  text-center cursor-pointer buttonUi" @click="onClickQuit" >
        <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 rounded-t-sm">QUIT
        </div>
        <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
    </section>
    <section>
      <h3 class="text-mac-white text-center">CONTROL</h3>
    
    <!-- key -->
    <article class="flex flex-row gap-2 ">
        <div class="text-center cursor-pointer buttonUi" >
          <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 px-3">◀️
          </div>
          <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
        </div>
        <div class="text-center cursor-pointer buttonUi" >
          <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 px-3">▶️
          </div>
          <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
        </div>
      </article>

    <article class="flex flex-row gap-2 ">
      <div class="text-center cursor-pointer buttonUi" >
        <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 px-10">Shift
        </div>
        <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
      </div>

      <div class="text-center cursor-pointer buttonUi" >
        <div class="w-full bg-mac-Azul font-extrabold text-mac-white border-mac-Lavender shadow-inner py-1 px-20">Space
        </div>
        <div class="w-full bg-mac-Azul brightness-50 text-mac-white border-mac-Lavender shadow-inner h-2  bottom-corner"></div>
      </div>
    </article>
  </section>
 
    </div>
  </Transition>
    <div id="phaser-wrapper" class="w-full h-full rounded-xl"></div>
    <!-- <div class="absolute flex flex-row">
      <video ref="localVideo" autoplay class="bg-mac-black h-20 w-20"></video>
      <video ref="remoteVideo" autoplay class="bg-mac-black h-20 w-20"></video>
    </div> -->
  </div>
</template>

<style scoped>
.buttonUi {
  transition:all 0.2s;
}
.buttonUi:hover .bottom-corner {
  height: 0.3rem;
	background: linear-gradient(-45deg, transparent 3px, #333399 0) right, linear-gradient(45deg, transparent 3px, #333399 0) left;
  background-size: 50% 100%;
	background-repeat: no-repeat;
}
.buttonUi:hover :first-child {
  border-radius:none;
}
.bottom-corner {
  transition:all 0.2s;
	background: linear-gradient(-45deg, transparent 5px, #333399 0) right, linear-gradient(45deg, transparent 5px, #333399 0) left;
	background-size: 50% 100%;
	background-repeat: no-repeat;
}</style>
