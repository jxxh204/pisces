<script setup lang="ts">
import Phaser from "phaser";
import Welcome from "@/phaser/Welcome/Welcome";
import {TileObject} from "@/phaser/TileObject/TileObject";
import {Icons} from "@/phaser/IconSprite/Icons";
import {Finder} from "@/phaser/Test/Finder";
import Character from "@/phaser/Sprites/Character";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {inject, onMounted, onUnmounted} from "vue";
import useFinderStore from "@/stores/finder.store";


const ZOOM_LEVEL = 1;
const finderStore = useFinderStore();
const emitter = inject('emitter')
console.log("game: ",finderStore.currentFinders['Game'])
const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT, // 자동으로 화면을 꽉채워줌
    // scale: {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_BOTH,
    // },
    parent: "phaser-wrapper", //canvas id
    width: 384, // -16
    height: 236, // -64
    autoCenter: Phaser.Scale.CENTER_BOTH, // 화면을 자동으로 센터에 맞추어줌.
    dom: {
        createContainer: true,
    },
    zoom: ZOOM_LEVEL,
    backgroundColor: "#000000",
    pixelArt: true, // 픽셀로 만들경우 선명하게나옴
    scene: [Welcome,TileObject, Icons, Finder, Character], //Level1 Welcome,systemIcons,DropDownTest 만들기. //
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
    const game = new Phaser.Game(config);
    const canvas = game.canvas;

    emitter.on('finder:Game',()=>{
        const gameRatio = game.config.width / game.config.height;
        const finderWidth = (finderStore.currentFinders['Game'].width-16)
        const finderHeight = (finderStore.currentFinders['Game'].height-64)
        const finderRatio = finderWidth /finderHeight

          if (finderRatio < gameRatio) {
            canvas.style.width = finderWidth + "px";
            canvas.style.height = finderWidth / gameRatio + "px";
          } else {
            canvas.style.width = finderHeight * gameRatio + "px";
            canvas.style.height = finderHeight + "px";
          }
    })


    // // canvas.style.zIndex = "-1";
    // const resize = () => {
    //   const windowRatio = SIZE_WIDTH_SCREEN / SIZE_HEIGHT_SCREEN;
    //   const gameRatio = game.config.width / game.config.height;
    //   if (windowRatio < gameRatio) {
    //     canvas.style.width = SIZE_WIDTH_SCREEN + "px";
    //     canvas.style.height = SIZE_WIDTH_SCREEN / gameRatio + "px";
    //   } else {
    //     canvas.style.width = SIZE_HEIGHT_SCREEN * gameRatio + "px";
    //     canvas.style.height = SIZE_HEIGHT_SCREEN + "px";
    //   }
    //   game.scale.resize(
    //     window.innerWidth / ZOOM_LEVEL,
    //     window.innerHeight / ZOOM_LEVEL
    //   );
    // };
})
onUnmounted(()=>{
    emitter.off('finder:Game')
})
</script>

<template>
    <div class="w-full h-full">
        <div
          id="phaser-wrapper"
          class="w-full h-full top-0 bottom-0 "
        ></div>
    </div>
</template>

<style scoped>

</style>