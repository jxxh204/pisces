import type {
  ActionsType,
  ImageOptionType,
  CharacterLocationType,
  AnimationsType,
} from "@/types/Characters";

export default class CreateCharacter {
  private static instance: CreateCharacter;
  phaser: Phaser.Scene;
  name: string;
  image: string;
  imageOption: ImageOptionType;
  actions: ActionsType;
  characterLocation: CharacterLocationType;
  character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  animations: AnimationsType[];
  constructor(
    phaser: Phaser.Scene,
    name: string,
    image: string,
    imageOption: ImageOptionType,
    actions: ActionsType,
    characterLocation: CharacterLocationType
  ) {
    //idle 상태만 해보자
    this.phaser = phaser;
    this.name = name;
    this.image = image; //action과 같은 순서대로 넣어야한다.
    this.imageOption = imageOption;
    this.actions = actions; // ex
    this.characterLocation = characterLocation;
    this.character = {} as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    this.animations = [];
  }
  loadImage() {
    console.log(this.name);
    //spritesheet_name : character
    this.phaser.load.spritesheet(this.name, this.image, {
      frameWidth: this.imageOption.frameWidth,
      frameHeight: this.imageOption.frameHeight,
    });
  }
  create() {
    this.character = this.phaser.physics.add.sprite(
      this.characterLocation.w,
      this.characterLocation.h,
      this.name
    );

    this.character.setBounce(0.2); // 바닥에서 튕기는 힘
    this.character.setCollideWorldBounds(true); // 바닥과 충돌
  }
  /**
   * @key : 애니메이션 이름
   * @start : 애니메이션 시작 프레임
   * @end : 애니메이션 끝 프레임
   * @frameRate : 애니메이션 속도
   * @repeat : 애니메이션 반복 횟수 -1은 무한반복
   * 필수요소 : key에 idle은 필수입니다.
   */
  setAnimations(options: AnimationsType[]) {
    this.animations = options;
  }
  getAnimations() {
    this.animations.forEach((animation) => {
      this.phaser.anims.create({
        key: animation.key,
        frames: this.phaser.anims.generateFrameNames(this.name, {
          start: animation.start,
          end: animation.end,
        }),
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
    this.character.play("idle", true); // idle 모션 실행.

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
  }
}
