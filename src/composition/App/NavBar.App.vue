<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import AppleLogo from "@/assets/images/icons/apple-logo.png";
import NavBarResize from "@/assets/images/icons/Menu-bar-resizer.svg";
import FinderIcon from "@/assets/images/icons/finder.svg";
import useFinderStore from "@/stores/finder.store";
import Tooltip from "@/components/Tooltip.vue";

const menus = [
  { name: "Home" },
  { name: "About" },
  { name: "Contact" },
  { name: "Projects" },
  { name: "Game" },
];
const finderStore = useFinderStore();
const hh = ref<string | number>(0);
const mm = ref<string | number>(0);
const time = ref<string>();

const setTime = () => {
  hh.value =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  mm.value =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();

  time.value = `${hh.value}:${mm.value}`;
};

onBeforeMount(() => {
  setTime();

  window.setInterval(() => {
    setTime();
  }, 1000);
});

//AM, PM
const meridiem = new Date().getHours() >= 12 ? "PM" : "AM";
</script>

<template>
  <div
    class="NavBar font-normal bg-mac-gray-300 z-10 flex flex-row justify-between chco rounded-t-md px-5"
  >
    <section class="flex flex-row gap-6 items-center cursor-select">
      <Tooltip name="fullScreen" direction="bottom">
        <template v-slot:tooltip>
          <img
            :src="AppleLogo"
            class="h-4 hover:text-mac-white hover:bg-mac-Azul px-1"
          />
        </template>
      </Tooltip>

      <p
        class="hover:text-mac-white hover:bg-mac-Azul cursor-select h-full px-1 flex-col justify-center hidden md:flex"
        v-for="(menu, index) in menus"
        :key="menu.name + index"
        @click="finderStore.addFinder(menu.name as FileNames)"
      >
        {{ menu.name }}
      </p>
    </section>
    <section class="flex flex-row items-center gap-2">
      <p>{{ time }} {{ meridiem }}</p>
      <img :src="NavBarResize" />
      <img class="h-4" :src="FinderIcon" />
      <p>Finder</p>
    </section>
  </div>
</template>

<style scoped>
.NavBar {
  width: 100%;
  height: 20px;
  left: 0px;
  top: 0px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
