<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import * as Phaser from "phaser";
import Level1 from "./phaser/Level1/Level1";
import Welcome from "./phaser/Welcome/Welcome";
import Test from "./phaser/Test";
// import Buttons from "../phaser/Buttons";
import { Characters } from "./phaser/Sprites/Characters";

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
  scene: [Welcome, Test], //Level1
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      // debug: true,
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
  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
