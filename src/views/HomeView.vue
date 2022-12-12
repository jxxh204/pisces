<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { from, fromEvent, useObservable } from "@vueuse/rxjs";
import * as Phaser from 'phaser';
import { Sprites } from '../module/phaser';
// const pink = new Image();
// pink.src = pink1;
// const canvas = ref();
const ZOOM_LEVEL = 2;
  const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.NONE,
    parent: "sprite", //canvas id
    width: window.innerWidth/ZOOM_LEVEL,
    height: window.innerHeight/ZOOM_LEVEL,
    zoom: ZOOM_LEVEL,
    backgroundColor: '#304858',
    pixelArt: true, // 픽셀로 만들경우 선명하게나옴
    scene: [ Sprites ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
};


onMounted(() => {
  const game = new Phaser.Game(config);
  const phaserCanvas:HTMLCanvasElement = game.canvas

  window.addEventListener("resize", () => {
          game.scale.resize(window.innerWidth/ZOOM_LEVEL, window.innerHeight/ZOOM_LEVEL);
      },false
  );

});
</script>

<template>
  <div>
    <!-- <canvas
      class="top-0 bottom-0 w-screen h-screen fixed z-10"
      ref="canvas"
    ></canvas> -->
    <div id="sprite" class="w-screen h-screen top-0 bottom-0 fixed"></div>
  </div>
</template>
<style scoped >

</style>
