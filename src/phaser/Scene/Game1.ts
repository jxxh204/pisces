import * as Phaser from "phaser";
import CreateCharacter from "@/module/createCharacter";
import Mushroom from "@/assets/characters/Mushroom.png";
import Swordsman from "@/assets/characters/swordsman-Sheet.png";
import NormalMan from "@/assets/characters/normalMan/normalMan.png";
// inGameLoading
// import inGameLoading from "./inGameLoading.png";

import { media } from "@/media/userMedia";
import type { AnimationsType } from "@/types/Characters";
import type { GetStreamSettings } from "@/media/media";

// import tiles from "@/phaser/TiledProject/Assets/Tiles.png";
// import background from "@/phaser/TiledProject/Background/Background.png";
import tiles from "@/phaser/TiledProject/Assets/Basic-Tilemap.png";
import background from "@/phaser/TiledProject/Background/background-tilemap.png";

type ColliderType = {
  floor: boolean;
  activeCount: boolean[];
  timer: number;
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

export default class Character extends Phaser.Scene {
  bg: {
    width: number;
    height: number;
    tileWidth: number;
  };
  backgroundObjects: BackgroundObjectsTypes;
  tileSize: {
    width: number;
    height: number;
  };
  inGameLoading: any;
  sprite: any;
  colliders: ColliderType;
  overLap: OverlapType;
  platforms: any;
  cursors: any;
  isBehavior: boolean;
  // motionState: Motions;
  motionSpeed: MotionSpeedTypes;
  sameTimeMotionInterval: 0;
  video: any;
  main_char: CreateCharacter | null;

  scene_finder: Phaser.Types.Physics.Arcade.SpriteWithStaticBody | null;

  map: Phaser.Tilemaps.Tilemap | null;
  constructor() {
    super({
      key: "Character", // 여러 scene을 사용할려면 키입력해야함.
      active: true,
    });
    this.bg = {
      width: 0,
      height: 0,
      tileWidth: 1800,
    };
    this.backgroundObjects = {
      background: null,
      floor: null,
      wall:null,
      object:null,
      trees: null,
      grass_forth: null,
      grass_back: null,
      stairs: null,
    };
    this.tileSize = {
      width: 800,
      height: 600,
    };
    this.inGameLoading = {} as any;
    this.sprite = {
      floor: {},
      background: {},
    };
    this.colliders = {
      floor: false,
      activeCount: [],
      timer: 0,
    };
    this.overLap = {
      mac: false,
    };

    this.isBehavior = false;
    this.motionSpeed = {
      walk: 200,
      run: 100,
      jump: 900,
    };
    this.platforms = {};
    this.cursors = {};

    this.video = {};

    this.sameTimeMotionInterval = 0;

    this.main_char = null;
    this.scene_finder = null;
    this.map = null;
  }
  setBackground(get: "load" | "create") {
    // 배경타일 생성
    if (get === "load") {
      // 배경
      this.load.image("tilesImage", tiles);
      this.load.image("backgroundImage", background);
      // this.load.tilemapTiledJSON("Game", "src/phaser/TiledProject/game.json"); //무조건 주소 자체를 넣어야함.
      this.load.tilemapTiledJSON("Game", "src/phaser/TiledProject/game2.json");
    } else {
      this.map = this.make.tilemap({
        key: "Game",
      });

      const tileSet = this.map.addTilesetImage("Tiles", "tilesImage");
      const backgroundSet = this.map.addTilesetImage(
        "Background",
        "backgroundImage"
      );
      //createLayer 순서대로 zindex가 잡힌다
      this.backgroundObjects.background = this.map.createLayer(
        "background",
        backgroundSet,
        0,
        0
      );
      this.backgroundObjects.floor = this.map.createLayer(
        "floor",
        tileSet,
        0,
        0
      );
      this.backgroundObjects.wall = this.map.createLayer(
        "wall",
        tileSet,
        0,
        0
      );
      this.backgroundObjects.object = this.map.createLayer(
        "object",
        tileSet,
        0,
        0
      );
      // this.backgroundObjects.floor = this.map.createLayer(
      //   "floor2",
      //   tileSet,
      //   0,
      //   0
      // );
      // this.backgroundObjects.grass_forth = this.map.createLayer(
      //   "grass_forth",
      //   tileSet,
      //   0,
      //   0
      // );
      // this.backgroundObjects.grass_back = this.map.createLayer(
      //   "grass_back",
      //   tileSet,
      //   0,
      //   0
      // );
      // this.backgroundObjects.trees = this.map.createLayer(
      //   "trees",
      //   tileSet,
      //   0,
      //   0
      // );
      // this.backgroundObjects.stairs = this.map.createLayer(
      //   "stairs",
      //   tileSet,
      //   0,
      //   0
      // );
    }
  }
  createCamera() {
    //내부 코드 정리하기.
    const cam = this.cameras.main;
    const canvas = this.game.canvas;
    const bottom = this.bg.height;
    // this.cameras.main.setBounds(0, 0, 3392, bottom);

    this.cameras.main.setBounds(0, 0, this.bg.width, bottom);
    // setBounds 내가 활동할 수 있는 공간은 제한 시키는 메소드. cam을 제한하는 코드

    // this.physics.world.setBounds(0, 0, 3392, 240);
    if (this.main_char) cam.startFollow(this.main_char.character, true); //카메라 따라다님
    cam.setZoom(3);
    //       this.cameras.main.setBounds(
    //         0, // 타일의 처음 지점.
    //         this.bg.height,
    //         this.bg.width, //타일의 끝지점으로.
    //         this.bg.height
    //       );

    // canvas.style.cursor = "none";
    // this.add.existing();
    // cam.pan(400, -this.tileSize.height, 1000);
    //w:400, h:??, 2000초동안 이동.
    // cam.zoomTo(2, 1000);
    //1초동안 줌2로 변경

    // cam.centerOn(0, 0);
    // cam.followOffset.set(-300, 0);
    // this.cameras.main.setPosition(-window.innerWidth / 2, 0);
  }
  setDepth() {
    this.backgroundObjects.grass_back?.setDepth(0);
    this.backgroundObjects.floor?.setDepth(1);
    //character : 2
    this.backgroundObjects.wall?.setDepth(2);
  }
  setCollider(objectArray:Phaser.Tilemaps.TilemapLayer[]) {
    objectArray.map((object) => {
    if(this.main_char){
      this.physics.add.collider(
        this.main_char.character,
        object
      );
    }
    object.setCollisionByProperty({ collides: true });
    })
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
      const streamSetting: GetStreamSettings = {
        video: true,
        audio: false,
        elementKind: "video",
        outputElement: video,
      };

      mediaInstance.settings(streamSetting);
      mediaInstance.getVideoStream();
      if (this.main_char) {
        const element = this.add.dom(
          250,
          this.main_char.character.y - 100,
          video
        );

        // var domElement = scene.add.dom(x, y, el, style, innerText);
        // element.setDepth();
        video.addEventListener("ended", (event) => {
          element.setVisible(false);
          console.log("비디오 끝");
          this.overLap.mac = false;
        });
      }
    }
  }
  setOverLap() {
    // 안씀.
    if (this.main_char)
      this.physics.add.overlap(
        this.main_char.character,
        this.sprite.mac,
        (a, mac) => {
          // @ts-ignore
          const index = mac.index;
          if (Math.sign(index) === 1) {
            //컴퓨터 닿음.
            if (!this.overLap.mac) this.getCameraStream();

            this.overLap.mac = true;
          }
        }
      );
  }

  loadC1() {
    const location = {
      x: 100,
      y: window.innerHeight / 2,
      currentY: 0,
    };
    this.main_char = new CreateCharacter(
      this,
      "Mushroom",
      Mushroom,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
      location,
      2
    );
    this.main_char.loadImage();
  }
  createC1() {
    this.main_char?.create();
    this.main_char?.setMotionSpeed(100, 200);
    const options = [
      {
        key: "right_idle",
        start: 0,
        end: 1,
        frameRate: 4,
        repeat: -1,
      },
      {
        key: "left_idle",
        start: 2,
        end: 3,
        frameRate: 4,
        repeat: -1,
      },
      {
        key: "right_walk",
        frames: [16, 17, 18, 19],
        frameRate: 8,
        repeat: 0,
      },
      {
        key: "left_walk",
        start: 20,
        end: 23,
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
    this.main_char?.setAnimations(options);
    this.main_char?.getAnimations();
  }
  loadSwordMan() {
    const location = {
      x: 100,
      y: this.bg.height,
      currentY: 0,
    };
    this.main_char = new CreateCharacter(
      this,
      "Swordsman",
      Swordsman,
      {
        frameWidth: 176,
        frameHeight: 128,
      },
      location,
      2
    );
    this.main_char.loadImage();
  }
  createSwordMan() {
    // this.main_char?.create();
    // this.main_char?.setMotionSpeed(300, 0, 1500);
    // this.main_char?.setAnimations(options);
    // this.main_char?.getAnimations();
  }
  loadNormalMan() {
    const location = {
      x: 100,
      y: this.bg.height-100,
      currentY: 0,
    };
    this.main_char = new CreateCharacter(
      this,
      "NormalMan",
      NormalMan,
      {
        frameWidth: 48,
        frameHeight: 48,
      },
      location,
      2
    );
    this.main_char.loadImage();
  }
  createNormalMan() {
    this.main_char?.create();
    this.main_char?.setMotionSpeed(60, 200, -200);
    const options = [
      {
        key: "idle",
        start: 0,
        end: 9,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: "walk", // left
        start: 10,
        end: 17,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: "run",
        start: 20,
        end: 27,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: "jump",
        start: 30,
        end: 32,
        frameRate: 2,
        repeat: 1,
      },
      {
        key: "wall_land",
        start: 50,
        end: 55,
        frameRate: 16,
        repeat: 0,
      },
      {
        key: "wall_slide",
        start: 60,
        end: 62,
        frameRate: 8,
        repeat: 1,
      },
    ] as AnimationsType[];
    this.main_char?.setAnimations(options);
    this.main_char?.getAnimations();

    this.main_char?.character.setSize(14,30) 
    //캐릭터 이미지에 빈공간이 있어 바닥에 닿지 않아 크기 조절
  }
  preload() {
    this.bg.width = this.scale.width;
    this.bg.height = this.scale.height;
    this.setBackground("load");
    // this.loadSwordMan();
    this.loadNormalMan();
  }
  create() {
    this.setBackground("create");
    // this.createSwordMan();
    this.createNormalMan();
    this.createCamera();
    this.setDepth();
  }
  update() {
    this.setCollider([
      this.backgroundObjects.floor,
      this.backgroundObjects.wall,
      this.backgroundObjects.object
    ]);
    this.main_char?.updateAnimations();
  }
}
