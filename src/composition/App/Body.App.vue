<script setup lang="ts">
import MacFile from "@/components/Mac/File.Mac.vue";
import FinderMacVue from "@/components/Mac/Finder.Mac.vue";

const files = ["About", "Contact", "Projects", "Game"];
</script>
아이콘은 전체 영역에 있어야하고 아이콘과 파인더는 같은 영역에 존재해야한다.

<template>
  <div
    id="app-body"
    class="w-full h-full bg-default-pattern bg-cover bg-center"
  >
    <section class="w-full h-full absolute">
      <FinderMacVue />
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
    </section>
  </div>
</template>

<style scoped></style>
