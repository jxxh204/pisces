// import * as Phaser from "phaser";
import { CreateFinder } from "@/module/createFinder";
import finder_webRTC from "@/assets/images/Finder/finder_webRTC.png";

export class Finder extends Phaser.Scene {
  finderClass: CreateFinder[];

  constructor() {
    super({
      key: "Finder",
      active: true,
    });
    this.finderClass = [];
  }
  preload() {
    const finders: FinderType[] = [
      {
        scene: this,
        name: "webRTC_finder",
        image: finder_webRTC,
        active: false,
        x: 0,
        y: 0,
        texture: "",
        address: "webRTC",
      },
    ];

    finders.map((finder: FinderType) => {
      const createdFinder = new CreateFinder(
        finder.scene,
        finder.name,
        finder.image,
        finder.active,
        finder.x,
        finder.y,
        finder.texture,
        finder.address
      );
      this.finderClass.push(createdFinder);
    });
    this.finderClass.map((finder) => {
      finder.loadImage();
    });

    //computer
  }
  create() {
    this.finderClass.map((finder) => {
      finder.create();
    });
  }
  update() {
    //observer로 사용하는게 더 효율적일듯.
    this.finderClass.map((finder) => {
      finder.update();
    });
  }
}
