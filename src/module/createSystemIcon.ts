import ClickOutside from "phaser3-rex-plugins/plugins/clickoutside.js";
type LocationType = {
  x: number;
  y: number;
};
export class CreateSystemIcon extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  name: string;
  image: string;
  width: number;
  height: number;
  location: LocationType;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;
  textSprite: any;
  constructor(
    scene: Phaser.Scene,
    name: string,
    image: string,
    width: number,
    height: number,
    location: LocationType
  ) {
    super(scene, location.x, location.y, name);

    this.scene = scene;
    this.name = name;
    this.image = image;
    this.width = width;
    this.height = height;
    this.location = location;
    this.sprite = null;
    this.textSprite = null;
  }
  loadImage() {
    // this.phaser.load.spritesheet(`system_${this.name}`, this.image, {
    //   frameWidth: this.width,
    //   frameHeight: this.height,
    // });
    this.setTexture(this.name);
    this.setPosition(this.location.x, this.location.y);
    this.scene.load.image(`system_${this.name}`, this.image);
  }
  create() {
    this.sprite = this.scene.physics.add.staticSprite(
      this.location.x,
      this.location.y,
      `system_${this.name}`
    );

    this.sprite.setInteractive();
    // this.sprite.input.cursor.valueOf('')

    // text
    this.textSprite = this.scene.add.text(
      this.location.x - 22,
      this.location.y + 20,
      this.name
    );

    this.textSprite.setInteractive();
    this.textSprite.setAlign("center");
    this.textSprite.setFontFamily("Monocraft");
    this.textSprite.setColor("black");
    this.textSprite.setBackgroundColor("#CCCCFF");
    this.textSprite.setFontSize(14);
    this.textSprite.setPadding(3);

    let clicked = {
      sprite: false,
      text: false,
    };
    this.sprite.addListener("pointerdown", (e: MouseEvent) => {
      this.sprite?.setTint(0x333333);
      this.textSprite.setTint(0x333333);
    });
    this.textSprite.addListener("pointerdown", (e: MouseEvent) => {
      this.sprite?.setTint(0x333333);
      this.textSprite.setTint(0x333333);
    });
    this.scene.plugins.get("rexClickOutsiden").add(this.sprite, {
      mode: "pointerdown",
    });
    this.scene.add.existing(this.sprite);
    const outClickSprite = new ClickOutside(this.sprite, {
      mode: "pointerdown",
    });
    outClickSprite.on("clickoutside", () => {
      this.textSprite.addListener("pointerdown", (e: MouseEvent) => {
        clicked.text = true;
      });
      if (clicked.text) {
        clicked.text = false;
        return;
      }
      this.sprite?.setTint(undefined);
      this.textSprite.setTint(undefined);
    });

    //     .on('clickoutside', function () {
    //         console.log("outside")
    //     })
  }

  // this.sprite.addListener('')
  // this.phaser.
}
