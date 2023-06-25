import type {
  ImageOptionType,
  CharacterLocationType,
  AnimationsType,
  ActionKeyType,
} from "@/types/Characters";

export default class CreateCharacter {
  private static instance: CreateCharacter;
  phaser: Phaser.Scene | any; // type 진짜 쉣이네
  name: string;
  image: string;
  imageOption: ImageOptionType;
  characterLocation: CharacterLocationType;
  character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  depth: number;

  animations: AnimationsType[];
  currentAction: ActionKeyType;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  motionSpeed: MotionSpeedTypes;
  direction: "left" | "right";
  constructor(
    phaser: Phaser.Scene,
    name: string,
    image: string,
    imageOption: ImageOptionType,
    characterLocation: CharacterLocationType,
    depth?: number
  ) {
    //idle 상태만 해보자
    this.phaser = phaser;
    this.name = name;
    this.image = image; //action과 같은 순서대로 넣어야한다.
    this.imageOption = imageOption;
    this.characterLocation = characterLocation;
    this.character = {} as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    this.depth = depth as number;

    this.animations = [];
    this.direction = "right";
    this.currentAction = `idle`;

    this.cursors = this.phaser.input.keyboard.createCursorKeys();

    this.motionSpeed = {
      walk: 200,
      run: 100,
      jump: 900,
    };
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
      this.characterLocation.x,
      this.characterLocation.y,
      this.name
    );
    if (this.depth) this.character.setDepth(this.depth);
    this.character.setBounce(0.2); // 바닥에서 튕기는 힘
    this.character.setCollideWorldBounds(true); // 바닥과 충돌
    this.phaser.cameras.main.startFollow(this.character);
  }
  /**
   * @key : 애니메이션 이름
   * @start : 애니메이션 시작 프레임
   * @end : 애니메이션 끝 프레임
   * @frameRate : 애니메이션 속도
   * @repeat : 애니메이션 반복 횟수 -1은 무한반복
   * @frames : 애니메이션 프레임 배열 (start, end와 같이 사용할 수 없음)
   * 필수요소 : key에 right_idle은 필수입니다.
   */
  setAnimations(options: AnimationsType[]) {
    this.animations = options;
  }
  setMotionSpeed(walk: number, run: number, jump?: number) {
    this.motionSpeed.walk = walk;
    this.motionSpeed.run = run;
    if (jump) this.motionSpeed.jump = jump;
  }

  getAnimations() {
    this.animations.forEach((animation) => {
      //https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html
      this.phaser.anims.create({
        key: animation.key,
        frames: this.phaser.anims.generateFrameNames(this.name, {
          start: animation.start,
          end: animation.end,
          frames: animation.frames,
          // zeroPad: animation.zeroPad,
        }),
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
    this.character.play(`idle`, true); // idle 모션 실행.
  }
  updateAnimations() {
    //리팩터링하기.
    const onRunPlayer = () => {
      this.currentAction = `run`;
      if (this.currentAction === `run`) {
        this.character.anims.play(`run`, true); //처음 한번만 모션 발동.
        this.currentAction = "running";
      }
      if (this.currentAction === "running") {
        // 모션과 별개로 계속 움직여야 하기에 따로 적용.
        if (this.direction === "left") {
          this.character.setVelocityX(-this.motionSpeed.run);
        } else {
          this.character.setVelocityX(this.motionSpeed.run);
        }
      }
    };
    if (this.cursors.space.isDown) { //점프
      if(this.character.body.onFloor()){// 바닥에 닿은 경우
        //스페이스바를 눌렀을 때 점프
        this.currentAction = `jump`;
        this.character.setVelocityY(this.motionSpeed.jump);
        this.character.anims.duration = 1000;
        this.character.anims.play(`jump`);
      }
    }
    if (this.cursors.left.isDown) {
      this.direction = "left";
      this.character.setFlipX(false);
      //왼쪽
      if (this.cursors.shift.isDown) {
        // 달리기. this.cursors.shift.isUp
        onRunPlayer();
      } else {
        //쉬프트 안누를 경우 걷기.
        this.character.setVelocityX(-this.motionSpeed.walk);
          if (this.character.body.onFloor()) {
            //점프가 아니면서 땅에 닿았을 경우에만 작동
            this.currentAction = `walk`;
            this.character.anims.play(this.currentAction, true);
          }
      }
    } else if (this.cursors.right.isDown) {
      this.direction = "right";
      // this.character.toggleFlipX();
      this.character.setFlipX(true);
      // 오른쪽
      if (this.cursors.shift.isDown) {
        // 달리기. this.cursors.shift.isUp
        onRunPlayer();
      } else {
        this.character.setVelocityX(this.motionSpeed.walk);
          if (this.character.body.onFloor()) {
            //점프가 아니면서 땅에 닿았을 경우에만 작동
            this.currentAction = `walk`;
            this.character.anims.play(this.currentAction, true);
          }
      }
    } else {
      // 기본상태.
        if (this.character.body.onFloor()) {
          this.character.setVelocityX(0);
          this.currentAction = `idle`;
          this.character.anims.play(this.currentAction, true);
        } else { //바닥에 닿지 않았는데 점프가 아닐 경우 강제 변경.
          // if(this.currentAction !== 'jump'){
          // this.currentAction = 'jump';
          // this.character.setVelocityY(this.motionSpeed.jump);
          // this.character.anims.duration = 1000;
          // this.character.anims.play('jump');
          // }
        }
    }
  }
}
