// let launchAppUrl = "twitter://twitter"; // 앱 스키마
// let launchAppUrl = props.link;
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

function participate(url: string, appName: string) {
  // 인터벌, 타이머 삭제
  function clearTimer() {
    clearInterval(schInterval);
    clearTimeout(timer);
  }

  // 인터벌 마다 동작할 기능
  function intervalSch() {
    // 매 인터벌 마다 웹뷰가 활성화 인지 체크
    if (document.hidden) {
      // 웹뷰 비활성화
      clearTimer(); // 앱이 설치되어있을 경우 타이머 제거
    } else {
      // 웹뷰 활성화
      console.log("타이머 동작");
    }
  }

  // 앱 실행(iOS인 경우)
  console.log(url);
  location.href = url;

  // 앱이 설치 되어있는지 체크
  schInterval = setInterval(intervalSch, 500);

  // 앱이 없을 경우
  const openNewWindow = window.open("about:blank");
  timer = setTimeout(function () {
    if (isAndroid) {
      // 스토어 유도
      // location.href = `https://play.google.com/store/apps/details?id=com.${appName}.android&hl=ko`;
      if (openNewWindow) openNewWindow.location.href = url;
    } else if (isIOS) {
      // 스토어 유도
      // location.href = `https://apps.apple.com/kr/app/${appName}/id1482454543`;
      if (openNewWindow) openNewWindow.location.href = url;
    }
    clearInterval(schInterval);
  }, 2000);
}
const deepLink = {
  mobile_chk,
  participate,
};

export default deepLink;
