import { ref } from "vue";
import { defineStore } from "pinia";
// import type { FinderComponentType, FileNames } from "@/types/finder";

export default defineStore("useAlertStore", () => {
  const alert = ref<AlertContent>({
    content: "",
  });
  const onAlert = (content: string) => {
    if (alert.value.content) return;

    alert.value.content = content;
    setTimeout(() => {
      alert.value.content = "";
    }, 2000);
  };
  return { alert, onAlert };
});
