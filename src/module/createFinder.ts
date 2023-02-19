import { useFinderAddressStore } from "@/stores/store_finderAddress";
export class CreateFinder extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  name: string;
  image: string;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
  textSprite: any;
  address: AddressType;
  constructor(
    scene: Phaser.Scene,
    name: string,
    image: string,
    active: boolean,
    x: number,
    y: number,
    texture: Phaser.Textures.Texture | string,
    address: AddressType
  ) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.name = name;
    this.image = image;
    this.active = active;
    this.address = address;
    // this.location = location;
    this.sprite = null;
    this.textSprite = null;
  }
  loadImage() {
    this.setTexture(this.name);
    // this.setPosition(this.location.x, this.location.y);
    this.scene.load.image(`finder_${this.name}`, this.image);
  }
  create() {
    this.sprite = this.scene.physics.add.staticSprite(
      0,
      0,
      `finder_${this.name}`
    );
    Phaser.Display.Align.In.Center(
      this.sprite,
      this.scene.add.zone(
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight
      )
    );
    this.sprite.setInteractive();
    // this.sprite.input.cursor.valueOf('')
  }
  update() {
    const finderAddressStore = useFinderAddressStore();
    if (this.address === finderAddressStore.getAddress()) {
      this.sprite?.setVisible(true);
    } else {
      this.sprite?.setVisible(false);
    }
  }
}
