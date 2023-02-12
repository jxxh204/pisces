import * as Phaser from "phaser";
import system_trashImg from "@/assets/images/system/Trash.png";
import system_webRTCImg from "@/assets/images/system/webRTC.png";
import { CreateSystemIcon } from "@/module/createSystemIcon";

export class Icons extends Phaser.Scene {
  trash: CreateSystemIcon | null;
  rtc: CreateSystemIcon | null;
  constructor() {
    super({
      key: "icons",
      active: true,
    });
    this.trash = null;
    this.rtc = null;
  }
  preload() {
    const trashLocation = {
      x: 500,
      y: 200,
    };
    this.trash = new CreateSystemIcon(
      this,
      "Trash",
      system_trashImg,
      trashLocation
    );
    this.trash?.loadImage();

    const rtcLocation = {
      x: 500,
      y: 300,
    };
    this.rtc = new CreateSystemIcon(
      this,
      "webRTC",
      system_webRTCImg,
      rtcLocation
    );
    this.rtc?.loadImage();
  }
  create() {
    this.trash?.create();
    this.rtc?.create();
  }
  update() {}
}
