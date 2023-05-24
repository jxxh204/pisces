<script setup lang="ts">
import TabImageComponent from "@/components/Tabs/TabImage.vue";
import TabContentComponent from "@/components/Tabs/TabContent.vue";
import useTabStore from "@/stores/tab.store";

const tabStore = useTabStore();
</script>
<template>
  <div class="h-full w-full flex flex-Col justify-center">
    <section
      id="project"
      class="w-full h-full flex flex-row justify-around items-center"
    >
      <TabImageComponent
        :image="tabStore.currentTab.image"
        :link="tabStore.currentTab.link"
      />

      <TabContentComponent />
      <!-- <article id="project_image" class="h-44 border-[1px] border-mac-black">
        <div
          class="project_image_tab border-t-[1px] border-mac-gray-300 w-full h-1"
        ></div>
        <img class="h-full object-contain" :src="CoplayMain" />
      </article> -->
    </section>
  </div>
</template>

<style scoped></style>
