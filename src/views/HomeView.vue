<script setup lang="ts">
import { onMounted } from "vue";
import * as Phaser from "phaser";
import Level1 from "../phaser/Level1/Level1";
import Welcome from "../phaser/Welcome/Welcome";
import MacSprite from "../phaser/Sprites/MacSprite";
// import Buttons from "../phaser/Buttons";

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
  scene: [Level1, MacSprite], //Welcome
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

onMounted(() => {
  const game = new Phaser.Game(config);

  game.canvas.style.zIndex = "-1";
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  // canvas.height = 600;
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
});
</script>

<template>
  <div>
    <div id="sprite" class="w-full h-full top-0 bottom-0 fixed"></div>
  </div>
</template>
<style scoped></style>
