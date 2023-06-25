<script setup lang="ts">
import TabImageComponent from "@/components/Tabs/TabImage.vue";
import TabContentComponent from "@/components/Tabs/TabContent.vue";
import TabTagComponent from "@/components/Tabs/TabTag.vue";
import useTabStore from "@/stores/tab.store";

const tabStore = useTabStore();
// 여기서 검색해서 가져오는걸로 변경해야 모션을 넣을 수 있을 듯.
</script>
<template>
  <div class="h-full flex flex-col">
    <section
      id="project"
      class="w-full h-full flex flex-col items-center p-10 gap-2"
    >
      <TabImageComponent
        :image="tabStore.currentTab.image"
        :link="tabStore.currentTab.link"
      />

      <TabContentComponent
        :projectName="tabStore.currentTab.name"
        :responsibilities="tabStore.currentTab.responsibilities"
      />
      <TabTagComponent :tags="tabStore.currentTab.tags" />
      <!-- <article id="project_image" class="h-44 border-[1px] border-mac-black">
        <div
          class="project_image_tab border-t-[1px] border-mac-gray-300 w-full h-1"
        ></div>
        <img class="h-full object-contain" :src="CoplayMain" />
      </article> -->
      <div v-if="tabStore.currentTab.demo" class="py-2">
        <a
          :href="tabStore.currentTab.demo"
          class="text-mac-black cursor-select mono-bold text-xl"
          target="_blank"
          >Demo</a
        >
        <div class="bg-mac-Lavender h-2 w-full"></div>
        <div class="h-10"></div>
      </div>
      <div v-else-if="tabStore.currentTab.reference" class="py-2">
        <a
          :href="tabStore.currentTab.reference"
          class="text-mac-black cursor-select mono-bold text-xl"
          target="_blank"
          >reference</a
        >
        <div class="bg-mac-Lavender h-2 w-full"></div>
        <div class="h-5"></div>
      </div>
      <div v-if="tabStore.currentTab.code" class="py-2">
        <a
          :href="tabStore.currentTab.code"
          class="text-mac-black cursor-select mono-bold text-xl"
          target="_blank"
          >Code</a
        >
        <div class="bg-mac-Lavender h-2 w-full"></div>
        <div class="h-10"></div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
