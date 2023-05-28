<script setup lang="ts">
import aboutButton from "@/assets/images/button/Icon Button.svg";
import type { TagName, FileNames } from "@/types/store";

interface Props {
  projectName: FileNames;
  responsibilities: string;
  tags: TagName;
}
const props = defineProps<Props>();
const tooltip = "working...";
</script>

<template>
  <article class="w-full h-full">
    <section class="w-full h-full flex flex-col gap-2">
      <article class="flex flex-row justify-between">
        <h2 class="chco text-lg">{{ props.projectName }}</h2>
        <div
          class="ds-tooltip ds-tooltip-mac-Lavender mono-light"
          :data-tip="tooltip"
        >
          <img
            :src="aboutButton"
            class="cursor-pointer h-5 hover:brightness-50 transition_basic"
          />
        </div>
      </article>
      <article class="h-full w-full">
        <p class="text-sm chco w-full h-full">{{ props.responsibilities }}</p>
      </article>
    </section>
  </article>
</template>

<style scoped></style>
