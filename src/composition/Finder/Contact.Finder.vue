<script setup lang="ts">
import gmailImg from "@/assets/images/icons/gmail.png";
import githubImg from "@/assets/images/icons/github.png";
import notionImg from "@/assets/images/icons/notion.svg";
import internetImg from "@/assets/images/icons/internet.svg";
import Tooltip from "@/components/Tooltip.vue";

import deepLink from "@/module/deepLink";
import { onMounted } from "vue";

const list = {
  Email: {
    image: gmailImg,
    id: "gmail",
    url: "ahhancom@gmail.com",
    size: "25M",
    kind: "google main address",
  },
  GitHub: {
    image: githubImg,
    id: "github",
    url: "https://github.com/jxxh204",
    size: "5M",
    kind: "github page",
  },
  Notion: {
    image: notionImg,
    id: "notion",
    url: "https://forest-torta-822.notion.site/JaeHwan-Kim-1ea77cba02054688854dc9b7c177a167",
    size: "15M",
    kind: "notion portfolio page",
  },
  Internet_Explorer: {
    image: internetImg,
    id: "internet",
    url: "Dead",
    size: "zero",
    kind: "notion portfolio page",
  },
};

const onClickContact = (url: string, appName: string) => {
  if (appName === "gmail" || appName === "internet") {
    return;
  }
  deepLink.participate(url, appName);
};
onMounted(() => {
  deepLink.mobile_chk();
});
</script>
<template>
  <div class="w-full h-full flex flex-col gap-2 p-6">
    <h3 class="mono-lg-bold mb-6">Contact Me!</h3>
    <article id="finder_body_nav" class="flex-row flex h-6 text-center w-full">
      <!-- item -->
      <div
        class="finder_shadow_in basis-4/12 bg-mac-gray-400 border-2 border-mac-black border-r-0 w-full"
      >
        Name
      </div>
      <div class="list_nav finder_shadow_in basis-4/12 text-left pl-2">
        Link
      </div>
      <div class="list_nav finder_shadow_in basis-1/12">Size</div>
      <div
        class="finder_shadow_in basis-3/12 bg-mac-gray-400 border-2 border-mac-black w-full; border-l-0 text-left pl-2"
      >
        Kind
      </div>
    </article>
    <ul v-for="(mail, key) in list" :key="mail.kind">
      <Tooltip
        :name="'click! ' + key"
        class="w-full h-14 flex flex-row items-center cursor-select text-xs"
        @click="onClickContact(mail.url, mail.id)"
      >
        <template v-slot:tooltip>
          <li class="bg-mac-gray-300 basis-4/12 pl-6 h-full liStyle gap-1">
            <img
              :src="mail.image"
              class="h-14 bg-mac-white"
              :class="key === 'Email' ? 'p-2' : ''"
            />{{ key }}
          </li>
          <li class="bg-mac-gray-200 basis-4/12 liStyle pl-2 truncate">
            {{ mail.url }}
          </li>
          <li class="basis-1/12 text-center">{{ mail.size }}</li>
          <li class="pl-2 truncate">{{ mail.kind }}</li>
        </template>
      </Tooltip>
    </ul>
  </div>
</template>

<style scoped>
.liStyle {
  @apply flex flex-row  items-center;
}
.list_nav {
  @apply bg-mac-gray-400 border-2 border-mac-black border-l-0 w-full;
}
</style>
