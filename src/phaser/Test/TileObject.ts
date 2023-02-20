import * as Phaser from "phaser";
import pcImg from "@/assets/images/computer.gif";
import mac_backgroundImg from "@/assets/images/bg/background.png";

export class TileObject extends Phaser.Scene {
  constructor() {
    super({
      key: "TileObject",
      active: true,
    });
  }
  preload() {
    // 배경
    this.load.image("macBackgroundImg", mac_backgroundImg);
    this.load.tilemapTiledJSON(
      "macTileSetImage",
      "src/phaser/Test/mac_tileset.json"
    ); //무조건 주소 자체를 넣어야함.

    // this.load.image("pc1TileSetName", pcImg);
  }
  create() {
    const map = this.make.tilemap({
      key: "macTileSetImage",
    });

    const macBackgroundTileSet = map.addTilesetImage(
      "mac_background",
      "macBackgroundImg"
    );
    // this.sprite.macBackground.setDepth(-1);
    // const pc1TileSet = map.addTilesetImage("pc1", "pc1TileSetName");
    // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
    const background = map.createLayer(
      "mac_background",
      macBackgroundTileSet,
      0,
      0
    );

    background.setDepth(-10);
  }
  update() {}
}
