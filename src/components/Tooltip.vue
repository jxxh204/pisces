<script setup lang="ts">
interface Props {
  name: string;
  direction?: "bottom" | "left" | "right";
}
const props = defineProps<Props>();
</script>

<template>
  <div
    class="ds-tooltip ds-tooltip-open ds-tooltip-mac-Lavender mono-light"
    :class="`ds-tooltip-${props.direction}`"
    :data-tip="props.name"
  >
    <slot name="tooltip"></slot>
  </div>
</template>

<style scoped></style>
