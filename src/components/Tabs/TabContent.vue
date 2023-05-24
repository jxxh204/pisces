<script setup lang="ts">
import aboutButton from "@/assets/images/button/Icon Button.svg";
</script>

<template>
  <article>
    <div class="flex flex-row">
      <h2>제목</h2>
      <img
        :src="aboutButton"
        class="cursor-pointer hover:brightness-50 transition-all delay-200"
      />
    </div>
  </article>
</template>

<style scoped></style>
