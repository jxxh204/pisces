import * as Phaser from "phaser";
import M_idle from "@/assets/Mushroom-Forrest/Idle.png";
import M_jump from "@/assets/Mushroom-Forrest/Jump.png";
import M_right from "@/assets/Mushroom-Forrest/Right.png";
import M_left from "@/assets/Mushroom-Forrest/Left.png";
import M_run_right from "@/assets/Mushroom-Forrest/Run_Right.png";
import M_run_left from "@/assets/Mushroom-Forrest/Run_Left.png";
// map
import tilesImg from "./Tiles.png";
import macTileSetImg from "../Sprites/mac.png";
import skyImg from "./sky/skyNew.png";
import { media } from "../../media/userMedia";

type SpriteType = {
  floor: any;
  background: any;
  mac: any;
  sky: any;
};
type ColliderType = {
  floor: boolean;
  activeCount: boolean[];
  timer: NodeJS.Timeout;
};
type OverlapType = {
  mac: boolean;
};

const Mushrooms: Mushrooms = {
  idle: M_idle,
  jump: M_jump,
  right: M_right,
  left: M_left,
  run_left: M_run_left,
  run_right: M_run_right,
};
const motionStateArray = [
  "up",
  "down",
  "left",
  "right",
  "space",
  "shift",
  "idle",
];

export default class Level1 extends Phaser.Scene {
  bg: object;
  player: any;
  sprite: SpriteType;
  colliders: ColliderType;
  overLap: OverlapType;
  playerState: "jump" | "idle" | "walk" | "run" | "running";
  platforms: any;
  cursors: any;
  playerLocation: object;
  isBehavior: boolean;
  // motionState: Motions;
  motionSpeed: MotionSpeedTypes;
  sameTimeMotionInterval: NodeJS.Timeout;
  video: any;

  constructor() {
    super({
      key: "Level1", // 여러 scene을 사용할려면 키입력해야함.
      active: false,
    });
    this.bg = {};
    this.player = {} as any;
    this.sprite = {
      floor: {},
      background: {},
    };
    this.colliders = {
      floor: false,
      activeCount: [],
      timer: {} as NodeJS.Timer,
    };
    this.overLap = {
      mac: false,
    };

    this.playerState = "idle";
    this.isBehavior = false;
    // this.motionState = {
    //   idle: false,
    //   up: false,
    //   down: false,
    //   left: false,
    //   right: false,
    //   space: false,
    //   shift: false,
    // };
    this.motionSpeed = {
      walk: 200,
      run: 100,
      jump: 900,
    };
    this.platforms = {};
    this.cursors = {};
    this.playerLocation = {
      w: 100,
      h: window.innerHeight,
      currentY: 0,
    };
    this.video = {};

    this.sameTimeMotionInterval = {} as NodeJS.Timeout;
  }

  loadMap() {
    //tileSet
    this.load.image("tileSetImage", tilesImg);
    this.load.image("macTileSetImage", macTileSetImg);
    this.load.image("skyTileSetImage", skyImg);
    //tileMap JSON
    this.load.tilemapTiledJSON("Level1", "src/phaser/Level1/tileset1.json"); //무조건 주소 자체를 넣어야함.
  }
  setZindex() {
    this.sprite.sky.setDepth(-1);
  }
  createMap() {
    const map = this.make.tilemap({ key: "Level1" });
    // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
    const tileset = map.addTilesetImage("Tiles", "tileSetImage");
    const macTileSet = map.addTilesetImage("mac", "macTileSetImage");
    const skyTileSet = map.addTilesetImage("skyNew", "skyTileSetImage");

    const objectH = -this.game.scale.baseSize.height; // zoom에 따라 맵이 맞게 배치되도록
    // const platforms = this.physics.add.staticGroup();

    this.sprite.background = map.createLayer("background", tileset, 0, objectH);
    this.sprite.floor = map.createLayer("floor", tileset, 0, objectH); //프로그램에서 설정한 레이어 불러옴.
    this.sprite.mac = map.createLayer("mac", macTileSet, 0, objectH);
    this.sprite.sky = map.createLayer("sky", skyTileSet, 0, objectH);
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
      0,
      `player${this.playerState}`
    );
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); // 바닥과 충돌
  }
  createCamera() {
    this.cameras.main.setBounds(0, 0, 3392, 0);
    // const playerLocation_H = (this.playerLocation.h/2)-60
    // this.physics.world.setBounds(0, 0, 3392,playerLocation_H); // 캐릭터 위치 조정
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08); // 카메라를 플레이어에 맞춤
    this.cameras.main.centerOn(0, 0); // 카메라가 따라다님.- 배경 끝에 가까워지면 자동으로 벽으로감.
    this.cameras.main.pan(0, 0, 0);
  }
  setCollider() {
    const setOnCollideFloor = (
      c: Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
      // console.log("🚀 ~ file: Level1.ts:174 ~ Level1 ~ setCollider ~ c", c);
      this.colliders.floor = c.active;
      if (this.colliders.timer) clearTimeout(this.colliders.timer);
      this.colliders.timer = setTimeout(() => {
        this.colliders.floor = false;
      }, 100); // 점프가 끝나면 callback 호출이 없어지기 때문에 0.1초뒤에 false가 된다.
    };
    // const setColliderMac = (
    //   _player: Phaser.Types.Physics.Arcade.GameObjectWithBody
    // ) => {
    //   console.log(
    //     "🚀 ~ file: Level1.ts:197 ~ Level1 ~ this.physics.add.collider ~ _player",
    //     _player.body.touching
    //   );
    // };
    //충돌감지 // update에 적용
    this.physics.add.collider(this.player, this.sprite.floor, (c) =>
      setOnCollideFloor(c)
    );

    this.sprite.floor.setCollisionByProperty({ collides: true });
    // var M = Phaser.Physics.Matter.MatterPhysics
  }
  async getCameraStream() {
    const mediaInstance = media.GetStream.getInstance();
    console.log("getCameraStream");
    const permission = await mediaInstance.permission("camera");
    if (permission?.camera !== "denied") {
      //권한 허용
      const video = document.createElement("video");
      video.playsInline = true;
      video.width = 100;
      video.height = 100;
      video.autoplay = true;
      const streamSetting = {
        video: true,
        audio: false,
        elementKind: "video",
        outputElement: video,
      };
      mediaInstance.settings(streamSetting);
      mediaInstance.getVideoStream();

      const element = this.add.dom(250, this.player.y - 100, video);
      // var domElement = scene.add.dom(x, y, el, style, innerText);
      // element.setDepth();
      video.addEventListener("ended", (event) => {
        element.setVisible(false);
        console.log("비디오 끝");
        this.overLap.mac = false;
      });
    }
  }
  setOverLap() {
    this.physics.add.overlap(this.player, this.sprite.mac, (a, mac) => {
      if (Math.sign(mac.index) === 1) {
        //컴퓨터 닿음.
        if (!this.overLap.mac) this.getCameraStream();

        this.overLap.mac = true;
      }
    });
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
  preload() {
    this.loadPlayer();
    this.loadMap();
  }

  create() {
    this.createMap();
    this.setZindex();
    this.createPlayer();
    this.createCamera();
    this.setOverLap();

    // this.bg = this.add.image(400, 300, 'background');
    // this.platforms = this.physics.add.staticGroup();

    // this.player.setAngle(90) - 각도 바꿈.

    // this.physics.add.collider(stars, platforms); // 충돌감지

    // this.physics.add.overlap(player, stars, this.collectStar, null, this); // 닿으면 사라지게? this.aaa.disableBody

    // 애니메이션

    this.playerAnimations();
    // this.playerLocation.currentY = this.player.y
    // this.playerLocation.currentY = 424;
    this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용
  }
  update() {
    this.setCollider();
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
}
