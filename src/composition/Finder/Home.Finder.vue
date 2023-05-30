<script setup lang="ts">
import profile from "@/assets/images/profile.jpg";
import { onMounted, ref } from "vue";
import MacFile from "@/components/Mac/File.Mac.vue";

const mainImage = ref<HTMLElement>();
const helloArticle = ref<HTMLElement>();
const skillSetRef = ref<HTMLElement>();
const files = ["About", "Contact"];
let isIntersection = true;
// 모듈화하기.
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};
const skillset = {
  Language: ["JavaScript", "TypeScript", "Go"],
  FramWork: ["Vue3", "React", "Electron", "PhaserJS"],
  Css: ["Scss/Sass", "Tainwindcss"],
  CI: ["GitHub Action"],
  Web_APIs: ["webWorker", "webCodec", "webBluetooth", "webRTC"],
  TEST: ["playwright", "cypress", "jest", "vitest"],
  API_Mocking: ["MSW"],
  AWS: ["Route53", "CloudFront", "S3", "EC2"],
};
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    console.log("The element is in the viewport");
    entries[0].target.classList.add("animation_upDown");
    // isIntersection = false;
    // setTimeout(() => {
    //   isIntersection = true;
    // }, 500);
  } else {
    console.log("The element is not in the viewport");
    entries[0].target.classList.remove("animation_upDown");
  }
};
onMounted(() => {
  const observer = new IntersectionObserver(handleIntersect, options);
  // if (mainImage.value) observer.observe(mainImage.value);
  // if (helloArticle.value) observer.observe(helloArticle.value);
  // if (skillSetRef.value) observer.observe(skillSetRef.value);
});
</script>

<template>
  <div
    ref="finderHome"
    class="w-full h-full flex flex-col justify-start p-14 gap-8 items-center"
  >
    <section
      id="home_top"
      class="relative flex flex-col items-center w-full h-44"
    >
      <img
        ref="mainImage"
        class="ds-mask ds-mask-squircle object-contain h-44 mb-0 animation_upDown"
        :src="profile"
      />
    </section>
    <section
      id="home_content"
      class="relative flex flex-row w-full justify-between animation_upDown"
    >
      <div class="w-full h-44"></div>
      <article
        ref="helloArticle"
        class="flex flex-col gap-4 font-bold text-2xl w-full items-center text-center absolute"
      >
        <h2>안녕하세요.</h2>
        <h2>Web Front-End</h2>
        <h2 class="flex flex-row gap-3 items-center">
          김재환 입니다.
          <picture class="mb-2">
            <source
              srcset="
                https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.webp
              "
              type="image/webp"
            />
            <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif"
              alt="🎉"
              width="32"
              height="32"
            />
          </picture>
        </h2>
      </article>
    </section>
    <section
      ref="skillSetRef"
      id="home_skillSet"
      class="flex flex-col gap-3 items-start text-sm"
    >
      <h2 class="chco-lg-bold text-2xl">skillSet</h2>
      <article
        class="border-4 rounded-lg border-dashed border-mac-Lavender text-base p-4 flex flex-col gap-3"
      >
        <ul
          v-for="(set, key) in skillset"
          :key="set"
          class="flex flex-col gap-3 mono-bold"
        >
          {{
            key
          }}
          <div class="flex flex-wrap gap-2">
            <li
              v-for="skill in set"
              :key="skill"
              class="chco-lg-bold px-2 py-1 font-semibold bg-mac-Lavender animation_slide cursor-pointer"
            >
              {{ skill }}
            </li>
          </div>
        </ul>
      </article>
    </section>
    <section
      id="files"
      class="flex flex-row gap-4 justify-center w-full h-full pb-14"
    >
      <MacFile
        v-for="(name, index) in files"
        :name="name"
        :key="name + `${index}`"
      />
    </section>
  </div>
</template>

<style scoped></style>
