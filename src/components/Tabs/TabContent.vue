<script setup lang="ts">
import aboutButton from "@/assets/images/button/Icon Button.svg";
// import type { TabName } from "@/types/finder";
import Tooltip from "../Tooltip.vue";

interface Props {
  projectName: TabName;
  responsibilities: string;
}
const props = defineProps<Props>();
</script>

<template>
  <article class="w-full h-full">
    <section class="w-full h-full flex flex-col gap-2">
      <article class="flex flex-row justify-between">
        <h2 class="chco text-lg">{{ props.projectName }}</h2>
        <Tooltip name="working..." class="h-full">
          <template v-slot:tooltip>
            <img
              :src="aboutButton"
              class="cursor-select h-5 hover:brightness-50 transition_basic"
            />
          </template>
        </Tooltip>
      </article>
      <article class="h-full w-full">
        <p class="text-sm chco w-full h-full">{{ props.responsibilities }}</p>
      </article>
    </section>
  </article>
</template>

<style scoped></style>
