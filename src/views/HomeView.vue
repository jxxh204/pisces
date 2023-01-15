<script setup lang="ts">
import { onMounted } from "vue";
import * as Phaser from "phaser";
import Level1 from "../phaser/Level1/Level1";
import Welcome from "../phaser/Welcome/Welcome";
import MacSprite from "../phaser/Sprites/MacSprite";

// 태블릿 1.8
// 맥북 2
const ZOOM_LEVEL = 2;
const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.NONE,
  parent: "sprite", //canvas id
  width: window.innerWidth / 2,
  height: window.innerHeight / 1.8,
  dom: {
    createContainer: true,
  },
  zoom: ZOOM_LEVEL,
  backgroundColor: "#304858",
  pixelArt: true, // 픽셀로 만들경우 선명하게나옴
  scene: [Welcome, Level1, MacSprite],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
};

onMounted(() => {
  const game = new Phaser.Game(config);
  game.canvas.style.zIndex = "-1";
  // const phaserCanvas:HTMLCanvasElement = game.canvas

  window.addEventListener(
    "resize",
    () => {
      game.scale.resize(
        window.innerWidth / ZOOM_LEVEL,
        window.innerHeight / ZOOM_LEVEL
      );
    },
    false
  );
});
</script>

<template>
  <div>
    <div id="sprite" class="w-screen h-screen top-0 bottom-0 fixed"></div>
  </div>
</template>
<style scoped></style>
