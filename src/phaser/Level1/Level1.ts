import * as Phaser from "phaser";
import M_idle from "@/assets/Mushroom-Forrest/idle.png";
import M_jump from "@/assets/Mushroom-Forrest/jump.png";
import M_walk from "@/assets/Mushroom-Forrest/walk.png";
import M_run from "@/assets/Mushroom-Forrest/run.png";
// map
import tilesImg from "./Tiles.png";

type SpriteType = {
  floor: any;
  tree: any;
  jump: any;
  background: any;
};
type ColliderType = {
  floor: boolean;
  tree: boolean;
  activeCount: boolean[];
  timer: NodeJS.Timeout;
};

const Mushrooms: Mushrooms = {
  idle: M_idle,
  jump: M_jump,
  walk: M_walk,
  run: M_run,
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
  playerState: "jump" | "idle" | "walk";
  platforms: any;
  cursors: any;
  playerLocation: object;
  isBehavior: boolean;
  motionState: Motions;
  sameTimeMotionInterval: NodeJS.Timeout;

  constructor() {
    super({
      key: "Level1", // 여러 scene을 사용할려면 키입력해야함.
      active: false,
    });
    this.bg = {};
    this.player = {} as any;
    this.sprite = {
      floor: {},
      tree: {},
      jump: {},
      background: {},
    };
    this.colliders = {
      floor: false,
      tree: false,
      activeCount: [],
      timer: {} as NodeJS.Timer,
    };

    this.playerState = "idle";
    this.isBehavior = false;
    this.motionState = {
      idle: false,
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    this.platforms = {};
    this.cursors = {};
    this.playerLocation = {
      w: 100,
      h: window.innerHeight,
      currentY: 0,
    };
    this.sameTimeMotionInterval = {} as NodeJS.Timeout;
  }
  loadMap() {
    this.load.image("tileSetImage", tilesImg);
    this.load.tilemapTiledJSON("Level1", "src/phaser/Level1/tileset1.json"); //무조건 주소 자체를 넣어야함.
  }
  createMap() {
    const map = this.make.tilemap({ key: "Level1" });
    // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
    const tileset = map.addTilesetImage("Tiles", "tileSetImage");

    const objectH = -this.game.scale.baseSize.height; // zoom에 따라 맵이 맞게 배치되도록
    // const platforms = this.physics.add.staticGroup();

    this.sprite.tree = map.createLayer("tree", tileset, 0, objectH);
    this.sprite.background = map.createLayer("background", tileset, 0, objectH);
    this.sprite.jump = map.createLayer("jump", tileset, 0, objectH);
    this.sprite.floor = map.createLayer("floor", tileset, 0, objectH); //프로그램에서 설정한 레이어 불러옴.
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
    this.load.spritesheet("player_walk", Mushrooms["walk"], {
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
    const setOncollideFloor = (
      c: Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
      this.colliders.floor = c.active;
      if (this.colliders.timer) clearTimeout(this.colliders.timer);
      this.colliders.timer = setTimeout(() => {
        this.colliders.floor = false;
      }, 100); // 점프가 끝나면 callback 호출이 없어지기 때문에 0.1초뒤에 false가 된다.
    };
    //충돌감지 // update에 적용
    this.physics.add.collider(this.player, this.sprite.floor, (c) =>
      setOncollideFloor(c)
    );

    this.physics.add.collider(this.player, this.sprite.jump, (c) =>
      setOncollideFloor(c)
    );

    this.sprite.floor.setCollisionByProperty({ collides: true });

    this.sprite.jump.setCollisionByProperty({ collides: true });

    // var M = Phaser.Physics.Matter.MatterPhysics
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
      frames: this.anims.generateFrameNames("player_walk", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNames("player_walk", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.player.play("idle", true); // idle 모션 실행.
  }
  preload() {
    this.loadPlayer();
    this.loadMap();
  }

  create() {
    this.createMap();
    this.createPlayer();
    this.createCamera();

    // this.bg = this.add.image(400, 300, 'background');
    // this.platforms = this.physics.add.staticGroup();

    // this.player.setAngle(90) - 각도 바꿈.

    // this.physics.add.collider(stars, platforms); // 충돌감지

    // this.physics.add.overlap(player, stars, this.collectStar, null, this); // 닿으면 사라지게? this.aaa.disableBody

    // 애니메이션

    this.playerAnimations();
    console.log(this.player.anims.currentAnim);
    // this.playerLocation.currentY = this.player.y
    // this.playerLocation.currentY = 424;
    this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용
  }
  update() {
    this.setCollider();

    if (this.playerState === "jump") {
      if (this.colliders.floor) {
        this.colliders.activeCount.push(true);
        if (this.colliders.activeCount.length > 15) {
          //점프가 끝났음.
          //점프하고 this.colliders.floor가 10번정도 들어와서 그것을 방지하고 점프했다는 것을 알기위해.
          this.colliders.activeCount = [];
          this.isBehavior = false; // idle로 변함
          this.playerState = "idle";
          console.log("바닥에 닿음", this.colliders.activeCount);
        }
      }
    }
    if (this.colliders.floor) {
      // 땅에 닿았을 경우에만 점프 가능.
      if (this.cursors.space.isDown) {
        //스페이스바를 눌렀을 때 점프
        this.playerState = "jump";
        this.player.setVelocityY(900);
        this.player.play("jump");
        this.isBehavior = true;
      }
    }

    if (this.cursors.left.isDown) {
      //왼쪽
      this.player.setVelocityX(-40);

      if (this.playerState !== "jump") {
        if (this.colliders.floor) {
          //점프가 아니면서 땅에 닿았을 경우에만 작동
          this.playerState = "walk";
          this.player.anims.play("left", true);
        }
      }
    } else if (this.cursors.right.isDown) {
      // 오른쪽
      this.player.setVelocityX(40);
      if (this.playerState !== "jump") {
        if (this.colliders.floor) {
          //점프가 아니면서 땅에 닿았을 경우에만 작동
          this.playerState = "walk";
          this.player.anims.play("right", true);
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

  sameTimeMotionHandler(motion: MotionStatus) {
    // jump
    let isMotion = true;
    if (motion === "idle") {
      motionStateArray.map((motion: MotionStatus) => {
        if (!this.motionState[motion]) {
          isMotion = false;
        } else {
          isMotion = true;
          return;
        }
      });
      if (!isMotion) {
        //모션이 없다면
        this.isBehavior = false; // idle모드 // true이면 idle로 안바뀜.
      }
    } else if (!this.motionState[motion]) {
      this.motionState[motion] = true;
    }
  }
}
