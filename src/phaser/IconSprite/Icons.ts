import * as Phaser from "phaser";
import system_trashImg from "@/assets/images/system/Trash.png";
import { CreateSystemIcon } from "@/module/createSystemIcon";

export class Icons extends Phaser.Scene {
  trash: CreateSystemIcon | null;
  constructor() {
    super({
      key: "icons",
      active: true,
    });
    this.trash = null;
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
      32,
      32,
      trashLocation
    );

    this.trash?.loadImage();
  }
  create() {
    this.trash?.create();
  }
  update() {}
}
