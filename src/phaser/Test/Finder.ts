import * as Phaser from "phaser";
import { CreateFinder } from "@/module/createFinder";
import finder_webRTC from "@/assets/images/Finder/finder_webRTC.png";

type FinderType = {
  // x,y,texture는 형식상 넣는것.
  scene: Phaser.Scene;
  name: string;
  image: string;
  x: 0;
  y: 0;
  texture: "";
};
export class Finder extends Phaser.Scene {
  finderClass: CreateFinder[];

  constructor() {
    super({
      key: "finder",
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
        x: 0,
        y: 0,
        texture: "",
      },
    ];

    finders.map((finder: FinderType) => {
      const createdFinder = new CreateFinder(
        finder.scene,
        finder.name,
        finder.image,
        finder.x,
        finder.y,
        finder.texture
      );
      this.finderClass.push(createdFinder);
    });
    this.finderClass.map((finder) => {
      finder.loadImage();
    });
  }
  create() {
    this.finderClass.map((finder) => {
      finder.create();
    });
  }
  update() {}
}
