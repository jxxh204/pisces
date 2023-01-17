<script setup lang="ts">
import { onMounted } from "vue";
import * as Phaser from "phaser";
import Level1 from "../phaser/Level1/Level1";
import Welcome from "../phaser/Welcome/Welcome";
import MacSprite from "../phaser/Sprites/MacSprite";
// import Buttons from "../phaser/Buttons";

const SIZE_WIDTH_SCREEN = window.innerWidth;
const SIZE_HEIGHT_SCREEN = window.innerHeight;

let ZOOM_LEVEL = 2;

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.NONE,
  parent: "sprite", //canvas id
  width: SIZE_WIDTH_SCREEN / ZOOM_LEVEL,
  height: 600,
  dom: {
    createContainer: true,
  },
  zoom: ZOOM_LEVEL,
  backgroundColor: "#304858",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [Level1, MacSprite], //Welcome
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
};

onMounted(() => {
  //반응형
  // if (window.innerHeight < 750) {
  //   // FHD 2
  //   ZOOM_LEVEL = 2;
  // }
  // if (window.innerHeight < 650) {
  //   // 맥북 1.6
  //   ZOOM_LEVEL = 1.6;
  // }

  const game = new Phaser.Game(config);

  game.canvas.style.zIndex = "-1";
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  canvas.height = 600;
  canvas.style.height = 600;
  // const resize = () => {
  //   const windowWidth = window.innerWidth;
  //   const windowHeight = window.innerHeight;
  //   const windowRatio = windowWidth / windowHeight;
  //   const gameRatio = game.config.width / game.config.height;

  //   if (windowRatio < gameRatio) {
  //     canvas.style.width = windowWidth + "px";
  //     canvas.style.height = windowWidth / gameRatio + "px";
  //   } else {
  //     canvas.style.width = windowHeight * gameRatio + "px";
  //     canvas.style.height = windowHeight + "px";
  //   }
  //   game.scale.resize(
  //     window.innerWidth / ZOOM_LEVEL,
  //     window.innerHeight / ZOOM_LEVEL
  //   );
  // };
  // resize();

  // window.addEventListener("resize", resize, false);
});
</script>

<template>
  <div>
    <div id="sprite" class="w-full h-full top-0 bottom-0 fixed"></div>
  </div>
</template>
<style scoped>
canvas {
  display: block;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
