import * as Phaser from "phaser";
import CreateCharacter from "@/module/createCharacter";
import Mushroom from "@/assets/characters/Mushroom.png";
import Swordsman from "@/assets/characters/swordsman-Sheet.png";

// inGameLoading
import inGameLoading from "./inGameLoading.png";

// map
import tilesImg from "./Tiles.png";
import macTileSetImg from "../Sprites/mac.png";
import city_backgroundImg from "./background/city_background.jpeg";
import mac_backgroundImg from "@/assets/images/bg/background.png";
import keyboardImg from "./keyboard.jpeg";

import system_trashImg from "@/assets/images/system/Trash.png";

import { media } from "@/media/userMedia";
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
  main_char: any;

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
    this.motionSpeed = {
      walk: 200,
      run: 100,
      jump: 900,
    };
    this.platforms = {};
    this.cursors = {};

    this.video = {};

    this.sameTimeMotionInterval = {} as NodeJS.Timeout;

    this.main_char = null;
  }

  loadMap() {
    //tileSet
    //tileName, tileImage,
    this.load.image("tileSetImage", tilesImg);
    // this.load.image("macTileSetImage", macTileSetImg);
    // this.load.image("cityTileSetImage", city_backgroundImg);
    // this.load.image("keyboardImage", keyboardImg);
    this.load.image("macBackgroundImg", mac_backgroundImg);
    this.load.spritesheet("system_trash", system_trashImg, {
      frameWidth: 32,
      frameHeight: 32,
    });
    //tileMap JSON
    // this.load.tilemapTiledJSON("Level1", "src/phaser/Level1/tileset1.json"); //무조건 주소 자체를 넣어야함.
    this.load.tilemapTiledJSON(
      "macTileset",
      "src/phaser/Level1/mac_tileset.json"
    ); //무조건 주소 자체를 넣어야함.
  }
  setZindex() {
    this.sprite.macBackground.setDepth(-1);
  }
  createSprite() {
    // const sprite = this.add.sprite(100, -500, "system_trash");
    const sprite = this.physics.add.staticSprite(
      500,
      this.scale.height * 2 - 80,
      `system_trash`
    );

    sprite.setInteractive();
    sprite.addListener("pointerdown", (e: MouseEvent) => {
      sprite.setTint(0x333333);
      // sprite.setTintFill("0000000");
    });
    console.log(
      "🚀 ~ file: Level1.ts:138 ~ Test ~ createSprite ~ this.scale.height ",
      this.scale.height
    );
    // text
    const text = this.add.text(500 - 22, this.scale.height * 2 - 60, "Trash");
    text.setAlign("center");
    text.setFontFamily("Monocraft");
    text.setColor("black");
    text.setBackgroundColor("#CCCCFF");
    text.setFontSize(14);
    text.setPadding(3);
  }
  createMap() {
    this.bg.width = this.scale.width;
    this.bg.height = this.scale.height;
    const map = this.make.tilemap({
      key: "macTileset",
    });

    // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
    const macTileSet = map.addTilesetImage("mac", "macTileSetImage");

    const macBackgroundTileSet = map.addTilesetImage(
      "mac_background",
      "macBackgroundImg"
    );
    // const keyboardTileSet = map.addTilesetImage("keyboard", "keyboardImage");

    // const platforms = this.physics.add.staticGroup();

    // this.sprite.mac = map.createLayer("mac", macTileSet, 0, this.bg.height);

    // this.sprite.keyboard = map.createLayer(
    //   "keyboard",
    //   keyboardTileSet,
    //   0,
    //   this.bg.height - 200
    // );
    this.sprite.macBackground = map.createLayer(
      "mac_background",
      macBackgroundTileSet,
      0,
      this.bg.height
    );
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
      345,
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
    const cam = this.cameras.main;
    const canvas = this.game.canvas;
    const bottom = this.bg.height;
    this.physics.world.setBounds(
      -50, // 타일의 처음 지점.
      bottom,
      this.bg.width + 100, //타일의 끝지점으로.
      this.bg.height
    );
    // 걸을 수 있는 거리가 1000이다. World를 제한 하는 코드

    // cam.setZoom(2); //해상도에따라 줌변경

    // canvas.style.cursor = "none";
    // this.add.existing();
    // cam.pan(400, this.bg.height - 200, 1000);
    //w:400, h:??, 2000초동안 이동.
    // cam.zoomTo(2, 1000);
    //1초동안 줌2로 변경
    cam.setBounds(
      0, // 타일의 처음 지점.
      bottom,
      this.bg.width, //타일의 끝지점으로.
      this.bg.height
    );
    // setBounds 내가 활동할 수 있는 공간은 제한 시키는 메소드. cam을 제한하는 코드
    cam.centerOn(this.bg.width / 2, this.bg.height - 150);
    cam.startFollow(
      this.main_char.character,
      true,
      0.8,
      0.8,
      0,
      this.bg.height / 2 - 300
    ); //카메라 따라다님
    // this.cameras.main.setPosition(-window.innerWidth / 2, 0);
  }
  setCollider() {
    this.colliders.floor = true;
    // const setOnCollideFloor = (
    //   c: Phaser.Types.Physics.Arcade.GameObjectWithBody
    // ) => {
    //   this.colliders.floor = c.active;
    //   if (this.colliders.timer) clearTimeout(this.colliders.timer);
    //   this.colliders.timer = setTimeout(() => {
    //     this.colliders.floor = false;
    //   }, 100); // 점프가 끝나면 callback 호출이 없어지기 때문에 0.1초뒤에 false가 된다.
    // };
    // //충돌감지 // update에 적용
    // this.physics.add.collider(
    //   this.main_char.character,
    //   this.sprite.floor,
    //   (c) => setOnCollideFloor(c)
    // );
    // this.sprite.floor.setCollisionByProperty({ collides: true });
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
  setOverLap() {
    this.physics.add.overlap(
      this.main_char.character,
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
  loadC1() {
    const location = {
      w: 100,
      h: window.innerHeight / 2,
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
    this.main_char.create();
    this.main_char.setMotionSpeed(100, 200);
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
    this.main_char.setAnimations(options);
    this.main_char.getAnimations();
  }
  loadC2() {
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
  createC2() {
    this.main_char.create();
    this.main_char.setMotionSpeed(300, 0, 900);
    const options = [
      {
        key: "left_idle",
        start: 0,
        end: 7,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: "right_idle",
        start: 10,
        end: 17,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: "left_walk",
        start: 60,
        end: 67,
        frameRate: 16,
        repeat: 0,
      },
      {
        key: "right_walk",
        start: 70,
        end: 77,
        frameRate: 16,
        repeat: 0,
      },
      {
        key: "jump",
        frames: [50, 53, 54, 55, 56, 59],
        zeroPad: 2,
        frameRate: 4,
        repeat: 0,
      },
    ] as AnimationsType[];
    this.main_char.setAnimations(options);
    this.main_char.getAnimations();
  }
  preload() {
    this.game.canvas.classList.add(
      `cursor-[../../assets/images/cat_cursor.gif(hand.cur),_pointer]`
    );
    this.loadC2();

    this.loadInGameLoading();
    this.loadMap();
  }
  create() {
    this.createC2();

    this.createMap();
    this.setZindex();
    // this.createInGameLoading();
    this.createCamera();
    this.setOverLap();
    this.createSprite();

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
    this.main_char.updateAnimations();
  }
}
