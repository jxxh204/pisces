<script setup lang="ts">
import TabImageComponent from "@/components/Tabs/TabImage.vue";
import TabContentComponent from "@/components/Tabs/TabContent.vue";
import useTabStore from "@/stores/tab.store";

const tabStore = useTabStore();
// 여기서 검색해서 가져오는걸로 변경해야 모션을 넣을 수 있을 듯.
</script>
<template>
  <div class="h-full flex flex-col">
    <section
      id="project"
      class="w-full h-full flex flex-col items-center p-3 gap-2"
    >
      <TabImageComponent
        :image="tabStore.currentTab.image"
        :link="tabStore.currentTab.link"
      />

      <TabContentComponent
        :projectName="tabStore.currentTab.name"
        :responsibilities="tabStore.currentTab.responsibilities"
        :tags="tabStore.currentTab.tags"
      />
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
