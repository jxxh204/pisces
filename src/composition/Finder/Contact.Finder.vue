<script setup lang="ts">
import gmailImg from "@/assets/images/icons/gmail.png";
import githubImg from "@/assets/images/icons/github.png";
import notionImg from "@/assets/images/icons/notion.svg";
import internetImg from "@/assets/images/icons/internet.svg";
import Tooltip from "@/components/Tooltip.vue";

import deepLink from "@/module/deepLink";
import { onMounted } from "vue";
import useAlertStore from "@/stores/alert.store";

const alertStore = useAlertStore();

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
    url: "https://jamkim.notion.site/JaeHwan-Kim-1ea77cba02054688854dc9b7c177a167",
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
const copyText = (url: string) => {
  if (navigator.clipboard !== undefined) {
    navigator.clipboard //https만 사용가능.
      .writeText(`복사할 텍스트`)
      .then(() => {
        alertStore.onAlert("copy Email");
      });
  } else {
    //http
    // execCommand 사용
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("복사 실패", err);
    }
    textArea.setSelectionRange(0, 0);
    document.body.removeChild(textArea);
    alertStore.onAlert("copy Email");
  }
};

const onClickContact = (url: string, appName: string) => {
  if (appName === "gmail") {
    copyText(url);
    return;
  } else if (appName === "internet") {
    alertStore.onAlert("Dead Browser");
    return;
  } else if (appName === "github") {
    window.open(url);
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
          <li
            class="md:bg-mac-gray-300 basis-4/12 md:pl-6 h-full liStyle gap-1 flex flex-row"
          >
            <img
              :src="mail.image"
              class="h-14 bg-mac-white"
              :class="key === 'Email' ? 'p-2' : ''"
            />
            <p class="hidden md:block">
              {{ key }}
            </p>
          </li>
          <li class="bg-mac-gray-200 basis-4/12 liStyle md:pl-2 truncate">
            {{ mail.id === "notion" ? "notion://JH.portfolio" : mail.url }}
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
