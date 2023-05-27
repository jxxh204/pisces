<script setup lang="ts">
import { useElementHover } from "@vueuse/core";
import { ref, onMounted } from "vue";

interface Props {
  image: string;
  link: string;
}
const props = defineProps<Props>();
const projeftImage = ref<HTMLElement>();
const mainImage = ref<HTMLImageElement>();
const isImageHover = useElementHover(projeftImage);

const mouseOut = (e: MouseEvent) => {
  const target = e.target;
  target.style.opacity = "0";
};

// let launchAppUrl = "twitter://twitter"; // 앱 스키마
let launchAppUrl = props.link;
let timer = 0; // 타이머
let schInterval = 0;
let userAgent = navigator.userAgent.toLowerCase();
let isAndroid = userAgent.search("android") > -1;
let isIOS = !isAndroid && /iphone|ipad|ipod/i.test(userAgent);
let os = "";

function mobile_chk() {
  var mobile = /iphone|ipad|ipod|android/i.test(
    navigator.userAgent.toLowerCase()
  );

  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.search("android") > -1) {
      return (os = "android");
    } else if (
      userAgent.search("iphone") > -1 ||
      userAgent.search("ipod") > -1 ||
      userAgent.search("ipad") > -1
    ) {
      return (os = "ios");
    } else {
      return (os = "otehr");
    }
  } else {
    return (os = "pc");
  }
}
const onClickHover = () => {
  //   window.open(props.link, "_blank");
  participate();
};
onMounted(() => {
  mobile_chk();
  console.log(mainImage.value?.height);
  //   if (os == "pc") {
  //     location.href = "웹주소 입력";
  //   }
});

function participate() {
  // 인터벌, 타이머 삭제
  function clearTimer() {
    clearInterval(schInterval);
    clearTimeout(timer);
  }

  // 인터벌 마다 동작할 기능
  function intervalSch() {
    // 매 인터벌 마다 웹뷰가 활성화 인지 체크
    if (document.webkitHidden || document.hidden) {
      // 웹뷰 비활성화
      clearTimer(); // 앱이 설치되어있을 경우 타이머 제거
    } else {
      // 웹뷰 활성화
      console.log("타이머 동작");
    }
  }

  // 앱 실행(iOS인 경우)
  location.href = launchAppUrl;

  // 앱이 설치 되어있는지 체크
  schInterval = setInterval(intervalSch, 500);

  timer = setTimeout(function () {
    if (isAndroid) {
      location.href =
        "https://play.google.com/store/apps/details?id=com.twitter.android&hl=ko";
    } else if (isIOS) {
      location.href = "https://apps.apple.com/kr/app/twitter/id1482454543";
    }
    clearInterval(schInterval);
  }, 2000);
}
</script>
<template>
  <article
    id="project_image"
    ref="projeftImage"
    class="relative h-full w-full border-[1px] border-mac-black flex flex-col items-center bg-default-pattern shadow-lg"
  >
    <div
      class="project_image_tab border-t-[1px] border-mac-gray-300 w-full h-1"
    ></div>
    <img
      ref="mainImage"
      class="object-cover w-full h-full p-1"
      :src="props.image"
    />
    <Transition>
      <div
        class="absolute w-full h-full top-0 left-0 bg-mac-Azul mono-lg-bold bg-opacity-50 text-mac-white transition_basic"
        @mouseleave="mouseOut"
        v-if="isImageHover"
      >
        <p
          class="cursor-pointer w-full h-full flex flex-col justify-center items-center"
          @click="onClickHover"
        >
          <span class="animate-bounce mb-9 absolute">↓</span>More
        </p>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.project_image_tab {
  background: #ffffff;
  box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5), inset 0px -1px 0px #262626;
}
</style>
