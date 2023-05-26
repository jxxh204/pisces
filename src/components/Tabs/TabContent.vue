<script setup lang="ts">
import aboutButton from "@/assets/images/button/Icon Button.svg";
import type { TagName, FileNames } from "@/types/store";

interface Props {
  projectName: FileNames;
  responsibilities: string;
  tags: TagName;
}
const props = defineProps<Props>();
</script>

<template>
  <article class="w-full h-full">
    <section class="w-full h-full flex flex-col gap-2">
      <article class="flex flex-row justify-between">
        <h2 class="chco text-base">{{ props.projectName }}</h2>
        <div
          class="ds-tooltip ds-tooltip-mac-Lavender mono-light"
          data-tip="working..."
        >
          <img
            :src="aboutButton"
            class="cursor-pointer h-5 hover:brightness-50 transition_basic"
          />
        </div>
      </article>
      <article>
        <p class="text-xs chco">{{ props.responsibilities }}</p>
      </article>
      <article class="">
        <div v-for="tag in props.tags" :key="tag">
          <div class="chco-lg-bold bg-mac-Lavender px-2 py-1 font-semibold">
            {{ tag }}
          </div>
        </div>
      </article>
    </section>
  </article>
</template>

<style scoped></style>
