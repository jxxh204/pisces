// level?로 바꿀까.
import M_idle from "@/assets/Mushroom-Forrest/Idle.png";
import M_jump from "@/assets/Mushroom-Forrest/Jump.png";
import M_right from "@/assets/Mushroom-Forrest/Right.png";
import M_left from "@/assets/Mushroom-Forrest/Left.png";
import M_run_right from "@/assets/Mushroom-Forrest/Run_Right.png";
import M_run_left from "@/assets/Mushroom-Forrest/Run_Left.png";
//모든 캐릭터를 출력
//캐릭터 제작 클래스는 따로 만들어야함.
const Mushrooms: Mushrooms = {
  idle: M_idle,
  jump: M_jump,
  right: M_right,
  left: M_left,
  run_left: M_run_left,
  run_right: M_run_right,
};

export class Characters extends Phaser.Scene {
  player: any;
  playerState: "jump" | "idle" | "walk" | "run" | "running";
  playerLocation: object;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  colliders: ColliderType;
  sprite: any;
  scenes: ScenesType;
  constructor() {
    super({
      key: "Characters",
      active: true,
    });
    this.player = {} as any;
    this.playerState = "idle";
    this.playerLocation = {
      w: 100,
      h: window.innerHeight,
      currentY: 0,
    };
    this.cursors = {} as any;
    this.colliders = {
      floor: false,
      activeCount: [],
      timer: {} as NodeJS.Timer,
    };
    this.sprite = {
      floor: {},
      background: {},
    };
    this.scenes = {
      level1: null,
    };
  }
  loadOtherScene() {
    this.scenes.level1 = this.scene.get("Level1");
    console.log(this.scenes.level1.colliders.floor);
  }
  loadPlayer() {
    this.load.spritesheet("player_idle", Mushrooms["idle"], {
      frameWidth: 32,
      frameHeight: 28,
    });
    this.load.spritesheet("player_jump", Mushrooms["jump"], {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("player_left", Mushrooms["left"], {
      frameWidth: 32,
      frameHeight: 28,
    });
    this.load.spritesheet("player_right", Mushrooms["right"], {
      frameWidth: 32,
      frameHeight: 28,
    });
    this.load.spritesheet("player_run_left", Mushrooms["run_left"], {
      frameWidth: 32,
      frameHeight: 28,
    });
    this.load.spritesheet("player_run_right", Mushrooms["run_right"], {
      frameWidth: 32,
      frameHeight: 28,
    });
  }
  createPlayer() {
    this.player = this.physics.add.sprite(
      this.playerLocation.w,
      600,
      `player${this.playerState}`
    );
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); // 바닥과 충돌
  }
  playerAnimations() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("player_idle", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames("player_jump", {
        start: 0,
        end: 7,
      }),
      // frameRate: 16,
      frameRate: 5,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNames("player_left", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNames("player_right", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    //run
    this.anims.create({
      key: "run_left",
      frames: this.anims.generateFrameNames("player_run_left", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run_right",
      frames: this.anims.generateFrameNames("player_run_right", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.player.play("idle", true); // idle 모션 실행.
  }
  setCollider() {
    const setOnCollideFloor = (
      c: Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
      // console.log("🚀 ~ file: Level1.ts:174 ~ Level1 ~ setCollider ~ c", c);
      this.scenes.level1.colliders.floor = c.active;
      if (this.colliders.timer) clearTimeout(this.colliders.timer);
      this.colliders.timer = setTimeout(() => {
        this.scenes.level1.colliders.floor = false;
      }, 100); // 점프가 끝나면 callback 호출이 없어지기 때문에 0.1초뒤에 false가 된다.
    };
    //충돌감지 // update에 적용
    this.physics.add.collider(this.player, this.sprite.floor, (c) =>
      setOnCollideFloor(c)
    );

    this.scenes.level1.sprite.floor.setCollisionByProperty({ collides: true });
    // var M = Phaser.Physics.Matter.MatterPhysics
  }

  preload() {
    this.loadOtherScene();
    console.log(this.physics.world.colliders);
    this.loadPlayer();
  }
  create() {
    this.createPlayer();
    this.playerAnimations();

    this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용
  }
  moveCaracter() {
    const onRunPlayer = (direction: "left" | "right") => {
      this.playerState = "run";
      if (this.playerState === "run") {
        this.player.anims.play(`run_${direction}`, true); //처음 한번만 모션 발동.
        this.playerState = "running";
      }
      if (this.playerState === "running") {
        // 모션과 별개로 계속 움직여야 하기에 따로 적용.
        if (direction === "left") {
          this.player.setVelocityX(-this.motionSpeed.run);
        } else {
          this.player.setVelocityX(this.motionSpeed.run);
        }
      }
    };

    if (this.playerState === "jump") {
      if (this.colliders.floor) {
        this.colliders.activeCount.push(true);
        if (this.colliders.activeCount.length > 15) {
          //점프가 끝났음.
          //점프하고 this.colliders.floor가 10번정도 들어와서 그것을 방지하고 점프했다는 것을 알기위해.
          this.colliders.activeCount = [];
          this.isBehavior = false; // idle로 변함
          this.playerState = "idle";
          // console.log("바닥에 닿음");
        }
      }
    }
    if (this.colliders.floor) {
      // 땅에 닿았을 경우에만 점프 가능.
      if (this.cursors.space.isDown) {
        //스페이스바를 눌렀을 때 점프
        this.playerState = "jump";
        this.player.setVelocityY(this.motionSpeed.jump);
        this.player.play("jump");
        this.isBehavior = true;
      }
    }

    if (this.cursors.left.isDown) {
      //왼쪽
      if (this.cursors.shift.isDown) {
        // 달리기. this.cursors.shift.isUp
        onRunPlayer("left");
      } else {
        //쉬프트 안누를 경우 걷기.
        this.player.setVelocityX(-this.motionSpeed.walk);
        if (this.playerState !== "jump") {
          if (this.colliders.floor) {
            //점프가 아니면서 땅에 닿았을 경우에만 작동
            this.playerState = "walk";
            this.player.anims.play("left", true);
          }
        }
      }
    } else if (this.cursors.right.isDown) {
      // 오른쪽
      if (this.cursors.shift.isDown) {
        // 달리기. this.cursors.shift.isUp
        onRunPlayer("right");
      } else {
        this.player.setVelocityX(this.motionSpeed.walk);
        if (this.playerState !== "jump") {
          if (this.colliders.floor) {
            //점프가 아니면서 땅에 닿았을 경우에만 작동
            this.playerState = "walk";
            this.player.anims.play("right", true);
          }
        }
      }
    } else {
      // 기본상태.
      if (this.playerState !== "jump") {
        if (this.colliders.floor) {
          this.player.setVelocityX(0);
          this.playerState = "idle";
          this.player.play("idle", true);
          this.isBehavior = false;
        }
      }
    }
  }
  update() {
    this.setCollider();
    this.moveCaracter();
  }
}
