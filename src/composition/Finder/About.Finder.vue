<script setup lang="ts">
import resumePDF from "@/assets/resume.pdf";
import { ref, onMounted, inject } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import deepLink from "../../module/deepLink";

const { pdf, pages, info } = usePDF(resumePDF, {
  onProgress,
  onError,
});
const page = ref(1);
const progress = ref(0);
const vuePDFEl = ref();

type progressType = {
  loaded: number;
  total: number;
};
function onProgress({ loaded, total }: progressType) {
  console.log(`${(loaded / total) * 100}% Loaded`);
  progress.value = (loaded / total) * 100;
}

function onError(reason: string) {
  console.error(`PDF loading error: ${reason}`);
}
const onClickNotion = () => {
  const url =
    "notion://forest-torta-822.notion.site/JaeHwan-Kim-1ea77cba02054688854dc9b7c177a167";
  //   window.open(props.link, "_blank");
  deepLink.participate(url, "notion");
};
const onClickPrev = () => {
  if (page.value > 1) {
    page.value = page.value - 1;
    vuePDFEl.value.classList.add("animation_slide_right");

    vuePDFEl.value.addEventListener(
      "animationend",
      function () {
        vuePDFEl.value.classList.remove("animation_slide_right");
      },
      { once: true }
    );
  }
};
const onClickNext = () => {
  if (page.value < pages.value) {
    page.value = page.value + 1;
    vuePDFEl.value.classList.add("animation_slide_left");

    vuePDFEl.value.addEventListener(
      "animationend",
      function () {
        vuePDFEl.value.classList.remove("animation_slide_left");
      },
      { once: true }
    );
  }
};
onMounted(() => {
  deepLink.mobile_chk();
});
</script>

<template>
  <div class="w-full h-full text-left flex flex-col gap-2">
    <Transition name="fade">
      <section
        v-if="progress < 100"
        id="about_loading"
        class="transition-all delay-300 absolute bg-mac-black bg-opacity-50 w-full h-full flex-row flex justify-center items-center"
      >
        <h2
          class="animate-pulse bg-mac-Azul rounded-md py-2 px-4 text-mac-Lavender mono-lg-bold"
        >
          PDF Loading ...
        </h2>
        <!-- progress -->
      </section>
    </Transition>
    <section class="p-6 flex flex-col gap-2 font-Pretendard text-lg">
      <h3 class="mono-lg-bold mb-6">About Me</h3>

      <p>
        * Vue, React 같은 프레임워크를 사용한 웹 개발을 하고 있습니다. 주요
        업무로는 webRTC와 같은 기술을 사용하여 미디어 송수신 웹을 개발하고
        있습니다. 미디어 송수신을 하다 보니 하드웨어 개발자와 협업을 자주 하는
        특별한 점이 있습니다.
      </p>
      <p>
        * 미디어 기술을 사용하는 것도 좋아하고 화려하든 심플하든 개발하여 끝을
        맺는 것을 좋아합니다. 저는 과정보단 결과주의인 듯합니다.
      </p>
      <p>
        * 완성이라는 기준이 없고 내가 만든 아키텍처가 맞는지, 지금의 코드가 가장
        효율적인지, 내가 한 것을 계속 의심하고 탐구하는 것을 좋아하고 그렇기에
        다른 사람을 함부로 평가하지 않는 사람입니다.
      </p>
      <p>
        * 프론트엔드 개발자는 디자이너, 백엔드 개발자, 디바이스 개발자 등
        필연적으로 많은 사람과 협업을 하는 직무라고 생각합니다. 그래서 다른
        직무보다도 협업의 중요성이 높다고 생각하고 개발 실력 못지않게 노력하고
        있습니다.
      </p>
    </section>
    <section
      class="flex flex-col justify-center items-center text-mac-white mono-lg-bold gap-2"
    >
      <h4
        class="buttonStyle cursor-pointer text-mac-Lavender"
        @click="onClickNotion"
      >
        Notion
      </h4>
      <h4 class="buttonStyle">
        <a :href="resumePDF" target="_blank">
          Resume (<span class="text-mac-Lavender">Downlaod</span>)</a
        >
      </h4>
    </section>
    <!-- :textLayer="false" :annotationLayer="false" -->
    <section
      class="flex flex-row gap-2 items-center justify-center mono-lg-bold"
    >
      <btn class="ds-btn" @click="onClickPrev"> Prev </btn>
      <span>{{ page }} / {{ pages }}</span>
      <btn class="ds-btn" @click="onClickNext"> Next </btn>
    </section>
    <section class="h-full w-full flex flex-row justify-center" ref="vuePDFEl">
      <VuePDF :pdf="pdf" :scale="1" :page="page">
        <div style="text-align: center">Loading...</div>
      </VuePDF>
    </section>
  </div>
</template>
<style scoped>
.buttonStyle {
  @apply bg-mac-Azul rounded-md px-4 py-2;
}
.buttonStyle:hover {
  @apply bg-mac-white border-mac-Azul  text-mac-Azul;
  transition: all 0.2s ease;
}
</style>
