import * as Phaser from "phaser";
import M_idle from "@/assets/Mushroom-Forrest/Idle.png";

export default class MacSprite extends Phaser.Scene {
  player: any;

  constructor() {
    super({
      key: "MacSprite", // 여러 scene을 사용할려면 키입력해야함.
      active: false,
    });
  }
  preload() {}

  create() {}
  update() {}
}
