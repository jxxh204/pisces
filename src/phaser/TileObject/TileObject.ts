import * as Phaser from "phaser";
import pcImg from "@/assets/images/computer.gif";
import mac_backgroundImg from "@/assets/images/bg/finder.svg";

export class TileObject extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap | null;
  constructor() {
    super({
      key: "TileObject",
      active: true,
    });
    this.map = null;
  }
  setBackground(get: "load" | "create") {
    // 배경타일 생성
    if (get === "load") {
      // 배경
      this.load.image("macBackgroundImg", mac_backgroundImg);
      this.load.tilemapTiledJSON(
        "macTileSetImage",
        "src/phaser/Test/mac_tileset.json"
      ); //무조건 주소 자체를 넣어야함.
    } else {
      this.map = this.make.tilemap({
        key: "macTileSetImage",
      });

      const macBackgroundTileSet = this.map.addTilesetImage(
        "mac_background",
        "macBackgroundImg"
      );
      const background = this.map.createLayer(
        "mac_background",
        macBackgroundTileSet,
        0,
        0
      );
    }
  }
  preload() {
    this.setBackground("load");
  }
  create() {
    this.setBackground("create");
  }
  update() {}
}
