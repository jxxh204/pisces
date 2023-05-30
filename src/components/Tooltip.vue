<script setup lang="ts">
interface Props {
  name: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
    :class="`ds-tooltip ds-tooltip-mac-Lavender mono-light`"
    :data-tip="props.name"
  >
    <slot name="tooltip"></slot>
  </div>
</template>

<style scoped></style>
