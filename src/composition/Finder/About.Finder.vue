<script setup lang="ts">
import resumePDF from "@/assets/resume.pdf";
import { ref, onMounted, inject } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";

const { pdf, pages, info } = usePDF(resumePDF, {
  onProgress,
  onError,
});
const page = ref(1);

type progressType = {
  loaded: number;
  total: number;
};
function onProgress({ loaded, total }: progressType) {
  console.log(`${(loaded / total) * 100}% Loaded`);
}

function onError(reason: string) {
  console.error(`PDF loading error: ${reason}`);
}
</script>

<template>
  <div class="w-full h-full text-center">
    <h3>About Me</h3>
    <p>
      - 웹 개발 : 저는 일반적인 front-end 개발자들과 똑같이 css, html, js를
      사용하여 웹을 개발합니다. 현재는 주로 vue, tailwind css를 사용하고loaded
      있습니다.
    </p>
    <p>
      - 웹 미디어 개발 : 특별하게 다른 부분이 있다면 웹 미디어개발과
      하드웨어와의 상호작용입니다. 프론트로써의 일은 기본적으로 하고 가장 주요한
      업무는 미디어 개발로 webRTC를 사용하여 실시간 미디어를 전송하고 전송한
      미디어를 받는 웹을 개발했습니다. 더 자세하게는 webCodec을 사용하여
      미디어의 frame을 in,decode하여 최대한 적은 대역폭으로 빠르게 미디어를
      전송할 수 있도록 제작하는 기능을 개발하였습니다.
    </p>
    <p>
      - 하드웨어와 협업 : 하드웨어 개발자와 프로토콜을 논의하여 하드웨어의
      카메라 화면을 웹에서 보고 실시간으로 컨트롤하는 기능을 주로
      개발하였습니다.
    </p>

    <p>resume</p>
    <p>notion</p>
    <!-- :textLayer="false" :annotationLayer="false" -->
    <div>
      <button @click="page = page > 1 ? page - 1 : page">Prev</button>
      <span>{{ page }} / {{ pages }}</span>
      <button @click="page = page < pages ? page + 1 : page">Next</button>
    </div>
    <div class="h-full w-full">
      <div v-for="page in pages" :key="page">
        <VuePDF :pdf="pdf" :scale="1.2" :page="page">
          <div style="text-align: center">Loading...</div>
        </VuePDF>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
