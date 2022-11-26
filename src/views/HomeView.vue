<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { from, fromEvent, useObservable } from "@vueuse/rxjs";
import { onKeyStroke } from "@vueuse/core";
import * as Phaser from 'phaser';
import { Sprites } from '../module/phaser';
// const pink = new Image();
// pink.src = pink1;
// const canvas = ref();

const useKey = ["a", "A", "s", "S", "d", "D", "w", "W"];
const pinkOption = ref({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    speed: 2,
    reversal: "left",
  });
  const config = {
    type: Phaser.AUTO,
    parent: "sprite", //canvas id
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#304858',
    scene: [ Sprites ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
};

  


// const key = useObservable(fromEvent(document, "keydown").pipe(
// ))

// var keyDowns = useObservable .fromEvent(document, "keydown")
// var keyUps = Rx.Observable.fromEvent(document, "keyup");
// var keyPresses = keyDowns
//   .merge(keyUps)
//   .groupBy(e => e.keyCode)
//   .map(group => group.distinctUntilChanged(null, e => e.type))
//   .mergeAll()

const onKeyBoardEvent = (ctx: CanvasRenderingContext2D) => {
  // const onReverse = () => {
  //   const tran = pinkOption.value.width + pinkOption.value.x;
  //   // ctx.save();
  //   ctx.scale(-1, 1);
  //   ctx.translate(-tran, 0);
  //   // ctx.restore();
  //   ctx.imageSmoothingEnabled = true;
  // };
  onKeyStroke(
    useKey,
    (e: any) => {
      e.preventDefault();
      console.log("keyup", pinkOption.value);
      switch (e.code) {
        case "KeyA":
          console.log("a");
          break;
        case "KeyS":
          console.log("s");
          break;
        case "KeyD":
          console.log("d");
          break;
        case "KeyW":
          console.log("w");
          break;
      }
    },
    { eventName: "keyup" }
  );
  onKeyStroke(
    useKey,
    (e: any) => {
      e.preventDefault();
      console.log("keydown", pinkOption.value.reversal);
      switch (e.code) {
        case "KeyA":
          pinkOption.value.x -= pinkOption.value.speed;
          if (pinkOption.value.reversal === "right") {
            pinkOption.value.reversal = "left";
            // onReverse();
          }
          console.log("a");
          break;
        case "KeyS":
          console.log("s");
          pinkOption.value.y += pinkOption.value.speed;
          break;
        case "KeyD":
          pinkOption.value.x += pinkOption.value.speed;
          if (pinkOption.value.reversal === "left") {
            pinkOption.value.reversal = "right";
            // onReverse();
          }
          break;
        case "KeyW":
          pinkOption.value.y -= pinkOption.value.speed;
          break;
      }
    },
    { eventName: "keydown" }
  );
};

onMounted(() => {
const game = new Phaser.Game(config);

  // const ctx = canvas.value.getContext("2d");
  // ctx.beginPath();
  // // ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  // pink.addEventListener(
  //   "load",
  //   () => {
  //     requestAnimationFrame(drawCanvas);
  //   },
  //   false
  // );

  // const drawCanvas = () => {
  //   ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  //   ctx.beginPath();
  //   ctx.drawImage(
  //     pink,
  //     pinkOption.value.x,
  //     pinkOption.value.y,
  //     pinkOption.value.width,
  //     pinkOption.value.height
  //   );
  //   requestAnimationFrame(drawCanvas);
  // };
  // onKeyBoardEvent(ctx);
});
</script>

<template>
  <div class="">
    <!-- <canvas
      class="top-0 bottom-0 w-screen h-screen fixed z-10"
      ref="canvas"
    ></canvas> -->
    <div id="sprite" class="w-screen h-screen top-0 bottom-0 fixed"></div>
  </div>
</template>
<style scoped >

</style>
