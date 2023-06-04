<script setup lang="ts">
import useAlertStore from "@/stores/alert.store";
import AlertIcon from "@/assets/images/icons/alertIcon.png";
const alertStore = useAlertStore();
</script>
<template>
  <Transition name="fade">
    <div
      v-if="alertStore.alert.content !== ''"
      class="absolute flex flex-row justify-center w-full bottom-[35%] z-50"
    >
      <div
        class="ds-alert shadow-lg lg:max-w-1/3 md:max-w-1/2 max-w-1/2 w-auto bg-mac-gray-400 finder_shadow_in"
      >
        <div class="flex-row">
          <img :src="AlertIcon" />
          <span> : {{ alertStore.alert.content }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
