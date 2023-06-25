<script setup lang="ts">
import resumePDF from "@/assets/resume.pdf";
import { ref, onMounted, inject } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import deepLink from "@/module/deepLink";

const { pdf, pages, info } = usePDF(resumePDF, {
  onProgress,
  onError,
});
const page = ref(1);
const progress = ref(0);
const vuePDFEl = ref();
const pdfScale = ref(1);
const isOverflow = ref(true);

type progressType = {
  loaded: number;
  total: number;
};

function onProgress({ loaded, total }: progressType) {
  console.log(`${(loaded / total) * 100}% Loaded`);
  progress.value = (loaded / total) * 100;
  if (progress.value >= 99) {
    setTimeout(() => {
      isOverflow.value = false;
    }, 500);
  }
}

function onError(reason: string) {
  console.error(`PDF loading error: ${reason}`);
}
const onClickNotion = () => {
  const url =
    "https://jamkim.notion.site/JaeHwan-Kim-1ea77cba02054688854dc9b7c177a167";
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
  if (document.body.clientWidth < 769) {
    pdfScale.value = 0.5;
  }
});
</script>

<template>
  <div
    class="w-full h-full text-left flex flex-col gap-2"
    :class="isOverflow ? 'overflow-hidden' : ''"
  >
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
        * 4년 차 프론트엔드 개발자로 스타트업에서 웹서비스를 기획/개발하였습니다. 주요 업무로는 webRTC와 같은 기술을 사용하여 미디어 송수신을 하거나 디바이스 컨트롤을 하는 웹 서비스를 개발하였습니다. 주로 대회에서 사용하는 웹 서비스를 개발하여 운영보다는 기한에 맞게 기획하고 개발하는 것에 더욱 높은 역량을 가지고 있습니다.
      </p>
      <p>
        * 사용해온 기술과 방식을 계속 의심하고 탐구하는 것을 좋아합니다. 의심하고 탐구하며 확신을 가지는 것에 매우 신중하기 때문에 다른 사람의 판단 혹은 결정도 쉽게 나오지 않는다고 생각합니다.
      </p>
      <p>
        * 프론트엔드 개발자는 디자이너, 백엔드 개발자, 디바이스 개발자 등 필연적으로 많은 사람과 협업을 하는 직무라고 생각합니다. 그래서 다른 직무보다도 협업의 중요성이 높다고 생각하고 개발 실력 못지않게 협업에 대해 고민하고 노력하고 있습니다.
      </p>
    </section>
    <section
      class="flex flex-col justify-center items-center text-mac-white mono-lg-bold gap-2"
    >
      <h4
        class="buttonStyle cursor-select text-mac-Lavender"
        @click="onClickNotion"
      >
        Notion
      </h4>
      <h4 class="buttonStyle">
        <a :href="resumePDF" target="_blank" download="resume(JaeHwan)">
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
      <VuePDF :pdf="pdf" :scale="pdfScale" :page="page"> </VuePDF>
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
