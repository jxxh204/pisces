import type {
  ActionsType,
  ImageOptionType,
  characterLocationType,
} from "@/types/Characters";

export default class CreateCharacter {
  private static instance: CreateCharacter;
  phaser: Phaser.Scene;
  name: string;
  image: string;
  imageOption: ImageOptionType;
  actions: ActionsType;
  characterLocation: characterLocationType;
  character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor(
    phaser: Phaser.Scene,
    name: string,
    image: string,
    imageOption: ImageOptionType,
    actions: ActionsType,
    characterLocation: characterLocationType
  ) {
    //idle 상태만 해보자
    this.phaser = phaser;
    this.name = "";
    this.image = image; //action과 같은 순서대로 넣어야한다.
    this.imageOption = imageOption;
    this.actions = actions; // ex
    this.characterLocation = characterLocation;
    this.character = {} as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  }
  public static getInstance(
    phaser: Phaser.Scene,
    name: string,
    image: string,
    imageOption: ImageOptionType,
    actions: ActionsType,
    characterLocation: characterLocationType
  ) {
    CreateCharacter.instance = new CreateCharacter(
      phaser,
      name,
      image,
      imageOption,
      actions,
      characterLocation
    );
    return CreateCharacter.instance;
  }
  loadImage() {
    console.log(this.image, this.phaser);
    this.phaser.load.spritesheet("character_idle", this.image, {
      frameWidth: this.imageOption.frameWidth,
      frameHeight: this.imageOption.frameHeight,
    });
  }
  create() {
    this.character = this.phaser.physics.add.sprite(
      this.characterLocation.w,
      600,
      `character_idle`
    );

    this.character.setBounce(0.2); // 바닥에서 튕기는 힘
    this.character.setCollideWorldBounds(true); // 바닥과 충돌
  }
  animations() {
    this.phaser.anims.create({
      key: "idle",
      frames: this.phaser.anims.generateFrameNames("player_idle", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });
    // this.phaser.anims.create({
    //   key: "jump",
    //   frames: this.phaser.anims.generateFrameNames("player_jump", {
    //     start: 0,
    //     end: 7,
    //   }),
    //   // frameRate: 16,
    //   frameRate: 5,
    // });
    // this.phaser.anims.create({
    //   key: "left",
    //   frames: this.phaser.anims.generateFrameNames("player_left", {
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 8,
    //   repeat: 0,
    // });
    // this.phaser.anims.create({
    //   key: "right",
    //   frames: this.phaser.anims.generateFrameNames("player_right", {
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 8,
    //   repeat: 0,
    // });
    this.character.play("idle", true); // idle 모션 실행.
  }
}
