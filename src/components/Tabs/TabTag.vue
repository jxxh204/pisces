<script setup lang="ts">
// import type { TagName } from "@/types/finder";

interface Props {
  tags: TagName[];
}
const props = defineProps<Props>();
</script>
<template>
  <article class="w-full h-full flex flex-col justify-start gap-2">
    <div class="flex flex-wrap gap-2 w-full">
      <p
        v-for="tag in props.tags"
        :key="tag"
        class="chco-lg-bold px-2 py-1 font-semibold bg-mac-Lavender"
      >
        {{ tag }}
      </p>
    </div>
  </article>
</template>

<style scoped></style>
