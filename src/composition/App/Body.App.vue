<script setup lang="ts">
import About from "@/assets/images/icons/about.svg";
import Contact from "@/assets/images/icons/contact.svg";
import Projects from "@/assets/images/icons/projects.svg";
import Game from "@/assets/images/icons/game.svg";

import MacFile from "@/components/Mac/File.Mac.vue";

const files = [
  { file: About, name: "About" },
  { file: Contact, name: "Contact" },
  { file: Projects, name: "About" },
  { file: Game, name: "Game" },
];
</script>
z
<template>
  <div
    id="app-body"
    class="w-full h-full bg-default-pattern bg-cover bg-center"
  >
    <section
      id="files"
      class="w-full h-full flex flex-row justify-center items-center gap-8"
    >
      <MacFile
        v-for="(i, index) in files"
        :img="i.file"
        :name="i.name"
        :key="i + `${index}`"
      />
    </section>
  </div>
</template>

<style scoped></style>
