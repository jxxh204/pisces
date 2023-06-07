import * as Phaser from "phaser";
import tiles from "@/phaser/TiledProject/Assets/Tiles.png";
import background from "@/phaser/TiledProject/Background/Background.png";

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
      this.load.image("tilesImage", tiles);
      this.load.image("backgroundImage", background);
      this.load.tilemapTiledJSON("Game", "src/phaser/TiledProject/game.json"); //무조건 주소 자체를 넣어야함.
    } else {
      this.map = this.make.tilemap({
        key: "Game",
      });

      const tileSet = this.map.addTilesetImage("Tiles", "tilesImage");
      const backgroundSet = this.map.addTilesetImage(
        "Background",
        "backgroundImage"
      );
      this.map.createLayer("floor", tileSet, 0, 0);
      this.map.createLayer("background", backgroundSet, 0, 0);
      // const background = this.map.createLayer(
      //   "mac_background",
      //   macBackgroundTileSet,
      //   0,
      //   0
      // );
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
