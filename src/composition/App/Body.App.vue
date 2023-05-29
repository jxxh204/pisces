<script setup lang="ts">
import MacFile from "@/components/Mac/File.Mac.vue";
import FinderMacVue from "@/components/Finder/Finder.vue";
import MenuMacVue from "@/components/Mac/Menu.Mac.vue";
import useFinderStore from "@/stores/finder.store";

const finderStore = useFinderStore();
const files = ["Home", "About", "Contact", "Projects", "Game"];
</script>
<!--아이콘은 전체 영역에 있어야하고 아이콘과 파인더는 같은 영역에 존재해야한다.-->

<template>
  <div id="app-body" class="w-full h-full">
    <section class="relative w-full h-full">
      <FinderMacVue
        v-for="(finder, index) in finderStore.currentFinders"
        @click="finderStore.clickFinder(finder.name)"
        :key="finder.name + index"
        :name="finder.name"
        :kind="finder.kind"
        :tabs="finder.kind === 'tab' ? finder.tabs : null"
        :zIndex="finder.zIndex"
      />
      <article
        id="files"
        class="w-full h-full flex flex-row justify-center items-center gap-8"
      >
        <MacFile
          v-for="(name, index) in files"
          :name="name"
          :key="name + `${index}`"
        />
      </article>
      <MenuMacVue />
    </section>
  </div>
</template>

<style scoped></style>
