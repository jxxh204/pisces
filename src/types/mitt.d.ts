import mitt from "mitt";
import type { FileNames } from "@/types/store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    emitter: mitt;
  }
}

type Events = `finder:${FileNames}`;
