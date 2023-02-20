import { useFinderAddressStore } from "@/stores/store_finderAddress";
import finder_exit_idle from "@/assets/images/Finder/finder_exit_idle.png";
import computerImg from "@/assets/images/computer.gif";

export class CreateFinder extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  name: string;
  image: string;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
  exitButton: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
  textSprite: any;
  computer1: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
  computer2: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
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
    this.exitButton = null;
    this.textSprite = null;
    this.computer1 = null;
    this.computer2 = null;
  }
  loadImage() {
    // this.setTexture(this.name);
    // this.setPosition(this.location.x, this.location.y);
    this.scene.load.image(`finder_${this.name}`, this.image);
    this.scene.load.image("finder_exit_idle", finder_exit_idle);

    //pc
    this.scene.load.image("pc1TileSetName", computerImg);
  }
  setLocation() {
    if (this.sprite) {
      Phaser.Display.Align.In.Center(
        this.sprite,
        this.scene.add.zone(
          window.innerWidth / 2,
          window.innerHeight / 2,
          window.innerWidth,
          window.innerHeight
        )
      );
      if (this.exitButton) {
        Phaser.Display.Align.In.TopLeft(this.exitButton, this.sprite);
        this.exitButton.setX(this.exitButton.x + 4);
        this.exitButton.setY(this.exitButton.y + 4);
      }
    }
  }
  setPointer() {
    this.exitButton?.setInteractive();
    this.exitButton?.addListener("pointerover", (e: MouseEvent) => {
      this.exitButton?.setTint(0x3333);
    });
    this.exitButton?.addListener("pointerout", (e: MouseEvent) => {
      this.exitButton?.setTint(undefined);
    });
    this.exitButton?.addListener("pointerdown", (e: MouseEvent) => {
      const finderAddressStore = useFinderAddressStore();
      finderAddressStore.moveAddress("");
    });
  }
  create() {
    this.sprite = this.scene.physics.add.staticSprite(
      0,
      0,
      `finder_${this.name}`
    );
    this.exitButton = this.scene.physics.add.staticSprite(
      100,
      100,
      `finder_exit_idle`
    );
    this.computer1 = this.scene.physics.add.staticSprite(
      0,
      0,
      "pc1TileSetName"
    );
    this.computer2 = this.scene.physics.add.staticSprite(
      0,
      0,
      "pc1TileSetName"
    );
    this.sprite.setDepth(1);
    this.exitButton.setDepth(2);
    //pc
    this.computer1.setDepth(2);
    this.computer1.setScale(0.6);
    this.computer2.setDepth(2);
    this.computer2.setScale(0.6);

    this.setPointer();
    this.setLocation();
    //pc 내용물은 따로 클래스를 만들어서 관리해야할듯.
    Phaser.Display.Align.In.LeftCenter(this.computer1, this.sprite);
    Phaser.Display.Align.In.RightCenter(this.computer2, this.sprite);
  }
  update() {
    const finderAddressStore = useFinderAddressStore();
    if (this.address === finderAddressStore.getAddress()) {
      this.sprite?.setVisible(true);
      this.exitButton?.setVisible(true);
      this.computer1?.setVisible(true);
      this.computer2?.setVisible(true);
    } else {
      this.sprite?.setVisible(false);
      this.exitButton?.setVisible(false);
      this.computer1?.setVisible(false);
      this.computer2?.setVisible(false);
    }
  }
}
