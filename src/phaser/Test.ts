import * as Phaser from "phaser";
import CreateCharacter from "@/module/createCharacter";
import Mushroom from "@/assets/characters/Mushroom.png";

import M_idle from "@/assets/Mushroom-Forrest/Idle.png";
import M_jump from "@/assets/Mushroom-Forrest/Jump.png";
import M_right from "@/assets/Mushroom-Forrest/Right.png";
import M_left from "@/assets/Mushroom-Forrest/Left.png";
import M_run_right from "@/assets/Mushroom-Forrest/Run_Right.png";
import M_run_left from "@/assets/Mushroom-Forrest/Run_Left.png";

// inGameLoading
import inGameLoading from "./Level1/inGameLoading.png";
// map
import tilesImg from "./Level1/Tiles.png";
import macTileSetImg from "./Sprites/mac.png";
import skyImg from "./Level1/sky/skyNew.png";
import { media } from "../media/userMedia";
import type { AnimationsType } from "@/types/Characters";

type ColliderType = {
  floor: boolean;
  activeCount: boolean[];
  timer: NodeJS.Timeout;
};
type OverlapType = {
  mac: boolean;
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

export default class Test extends Phaser.Scene {
  bg: {
    width: number;
    height: number;
  };
  player: any;
  playerState: "jump" | "idle" | "walk" | "run" | "running";
  playerLocation: object;

  inGameLoading: any;
  sprite: any;
  colliders: ColliderType;
  overLap: OverlapType;
  platforms: any;
  cursors: any;
  isBehavior: boolean;
  // motionState: Motions;
  motionSpeed: MotionSpeedTypes;
  sameTimeMotionInterval: NodeJS.Timeout;
  video: any;
  m_ins: any;

  constructor() {
    super({
      key: "Level1", // 여러 scene을 사용할려면 키입력해야함.
      active: false,
    });
    this.bg = {
      width: 0,
      height: 0,
    };
    this.inGameLoading = {} as any;
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

    this.video = {};

    this.sameTimeMotionInterval = {} as NodeJS.Timeout;

    this.m_ins = null;
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
    this.bg.width = this.scale.width;
    this.bg.height = this.scale.height;
    const map = this.make.tilemap({
      key: "Level1",
    });

    // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
    const tileset = map.addTilesetImage("Tiles", "tileSetImage");
    const macTileSet = map.addTilesetImage("mac", "macTileSetImage");
    const skyTileSet = map.addTilesetImage("skyNew", "skyTileSetImage");

    // const platforms = this.physics.add.staticGroup();

    this.sprite.background = map.createLayer("background", tileset, 0, 0);
    this.sprite.floor = map.createLayer("floor", tileset, 0, 0); //프로그램에서 설정한 레이어 불러옴.
    this.sprite.mac = map.createLayer("mac", macTileSet, 0, 0);
    this.sprite.sky = map.createLayer("sky", skyTileSet, 0, 0);
  }
  loadInGameLoading() {
    //위치 바꾸기
    this.load.spritesheet("inGameLoading", inGameLoading, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  createInGameLoading() {
    this.inGameLoading = this.physics.add.staticSprite(
      250,
      this.bg.height + 60,
      `inGameLoading`
    );
    console.log(this.sprite.mac, this.game.scale.baseSize.height);
    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNames("inGameLoading", {
        start: 0,
        end: 20,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.inGameLoading.play("loading", true);
  }
  createCamera() {
    //내부 코드 정리하기.
    this.physics.world.setBounds(
      0, // 타일의 처음 지점.
      this.bg.height - 100,
      1000, //타일의 끝지점으로.
      this.bg.height
    );
    // 걸을 수 있는 거리가 1000이다. World를 제한 하는 코드

    const cam = this.cameras.main;
    const canvas = this.game.canvas;
    cam.setZoom(2);
    canvas.style.cursor = "none";
    // this.add.existing();

    // cam.pan(400, this.bg.height - 200, 1000);
    //w:400, h:??, 2000초동안 이동.
    // cam.zoomTo(2, 1000);
    //1초동안 줌2로 변경
    cam.setBounds(
      0, // 타일의 처음 지점.
      this.bg.height - 200,
      1000, //타일의 끝지점으로.
      this.bg.height
    );
    // setBounds 내가 활동할 수 있는 공간은 제한 시키는 메소드. cam을 제한하는 코드
    cam.centerOn(this.bg.width / 2, this.bg.height - 150);
    cam.startFollow(
      this.m_ins.character,
      true,
      0.8,
      0.8,
      0,
      this.bg.height / 2 - 200
    ); //카메라 따라다님
    // this.cameras.main.setPosition(-window.innerWidth / 2, 0);
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
    //충돌감지 // update에 적용
    this.physics.add.collider(this.m_ins.character, this.sprite.floor, (c) =>
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

      const element = this.add.dom(250, this.m_ins.character.y - 100, video);
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
    this.physics.add.overlap(
      this.m_ins.character,
      this.sprite.mac,
      (a, mac) => {
        if (Math.sign(mac.index) === 1) {
          //컴퓨터 닿음.
          if (!this.overLap.mac) this.getCameraStream();

          this.overLap.mac = true;
        }
      }
    );
  }
  preload() {
    const location = {
      w: 100,
      h: window.innerHeight - 100,
      currentY: 0,
    };
    this.m_ins = new CreateCharacter(
      this,
      "Mushroom",
      Mushroom,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
      location
    );

    this.loadInGameLoading();
    this.loadMap();
    this.m_ins.loadImage();
  }
  create() {
    this.m_ins.create();
    const options = [
      {
        key: "idle",
        start: 0,
        end: 1,
        frameRate: 4,
        repeat: -1,
      },
      {
        key: "walk",
        frames: [17, 18, 19, 20, 19, 18],
        frameRate: 8,
        repeat: 0,
      },
      {
        key: "jump",
        start: 41,
        end: 48,
        frameRate: 4,
        repeat: 0,
      },
      {
        key: "run",
        start: 25,
        end: 32,
        frameRate: 8,
        repeat: 0,
      },
    ] as AnimationsType[];
    this.m_ins.setAnimations(options);
    this.m_ins.getAnimations();
    this.createMap();
    this.setZindex();
    this.createInGameLoading();
    this.createCamera();
    this.setOverLap();

    // this.bg = this.add.image(400, 300, 'background');
    // this.platforms = this.physics.add.staticGroup();

    // this.player.setAngle(90) - 각도 바꿈.

    // this.physics.add.collider(stars, platforms); // 충돌감지

    // this.physics.add.overlap(player, stars, this.collectStar, null, this); // 닿으면 사라지게? this.aaa.disableBody

    // 애니메이션

    // this.playerLocation.currentY = this.player.y
    // this.playerLocation.currentY = 424;
  }
  update() {
    this.setCollider();
    this.m_ins.updateAnimations();
  }
}
