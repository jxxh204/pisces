<script setup lang="ts">
import { ref } from "vue";
import About from "@/assets/images/icons/about.svg";
import Contact from "@/assets/images/icons/contact.svg";
import Projects from "@/assets/images/icons/projects.svg";
import Game from "@/assets/images/icons/CD.svg";
import Home from "@/assets/images/icons/apple.svg";
// import type { FileNames } from "@/types/finder";

interface Props {
  name: FileNames;
  isClick?: boolean;
}
const props = defineProps<Props>();
const images = {
  About,
  Contact,
  Projects,
  Game,
  Home,
};
</script>

<template>
  <img
    :src="images[props.name]"
    :class="props.isClick ? 'brightness-[.2]' : ''"
  />
</template>

<style scoped></style>
