//finder address
type AddressType = "webRTC" | "audio" | "";

type FinderType = {
  // x,y,texture는 형식상 넣는것.
  scene: Phaser.Scene;
  name: string;
  image: string;
  active: boolean;
  x: 0;
  y: 0;
  texture: "";
  address: AddressType;
};
type BackgroundObjectsTypes = {
  background: null | Phaser.Tilemaps.TilemapLayer;
  floor: null | Phaser.Tilemaps.TilemapLayer;
  trees: nul | Phaser.Tilemaps.TilemapLayer;
  grass_forth: null | Phaser.Tilemaps.TilemapLayer;
  grass_back: null | Phaser.Tilemaps.TilemapLayer;
  stairs: nul | Phaser.Tilemaps.TilemapLayer;
};
