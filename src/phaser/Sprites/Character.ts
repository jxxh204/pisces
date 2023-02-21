import type { Finder } from "./../Test/Finder";
import * as Phaser from "phaser";
import CreateCharacter from "@/module/createCharacter";
import Mushroom from "@/assets/characters/Mushroom.png";
import Swordsman from "@/assets/characters/swordsman-Sheet.png";

// inGameLoading
// import inGameLoading from "./inGameLoading.png";

import { media } from "@/media/userMedia";
import type { AnimationsType } from "@/types/Characters";
import { useFinderAddressStore } from "../../stores/store_finderAddress";
import Observer from "@/module/observer";

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

  scene_finder: Finder | null;

  constructor() {
    super({
      key: "Character", // 여러 scene을 사용할려면 키입력해야함.
      active: true,
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
    this.scene_finder = null;
  }

  // loadInGameLoading() {
  //   //위치 바꾸기
  //   this.load.spritesheet("inGameLoading", inGameLoading, {
  //     frameWidth: 32,
  //     frameHeight: 32,
  //   });
  // }
  // createInGameLoading() {
  //   this.inGameLoading = this.physics.add.staticSprite(
  //     345,
  //     this.bg.height + 60,
  //     `inGameLoading`
  //   );
  //   console.log(this.sprite.mac, this.game.scale.baseSize.height);
  //   this.anims.create({
  //     key: "loading",
  //     frames: this.anims.generateFrameNames("inGameLoading", {
  //       start: 0,
  //       end: 20,
  //     }),
  //     frameRate: 5,
  //     repeat: -1,
  //   });
  //   this.inGameLoading.play("loading", true);
  // }
  createCamera() {
    //내부 코드 정리하기.
    const cam = this.cameras.main;
    const canvas = this.game.canvas;
    const bottom = this.bg.height;
    this.physics.world.setBounds(
      -50, // 타일의 처음 지점.
      bottom,
      this.bg.width + 100, //타일의 끝지점으로.
      bottom
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
    this.bg.width = this.scale.width;
    this.bg.height = this.scale.height;

    this.loadC2();
  }
  create() {
    this.createC2();
    this.createCamera();

    this.scene_finder = this.scene.get("Finder") as Finder;
    console.log(
      "🚀 ~ file: Character.ts:366 ~ Test ~ create ~ this.scene_finder ",
      this.scene_finder?.finderClass
    );

    // this.bg = this.add.image(400, 300, 'background');
    // this.platforms = this.physics.add.staticGroup();

    // this.player.setAngle(90) - 각도 바꿈.

    // this.physics.add.collider(stars, platforms); // 충돌감지

    // this.physics.add.overlap(player, stars, this.collectStar, null, this); // 닿으면 사라지게? this.aaa.disableBody

    // 애니메이션

    // this.playerLocation.currentY = this.player.y
    // this.playerLocation.currentY = 424;

    this.main_char.character.setDepth(10);
    const observer = Observer.getInstance();
    //파인더 열릴 경우 캐릭터 위치 이동
    const observer_event = {
      id: "finder_address",
      func: (address: AddressType) => {
        if (!address) {
          console.log(
            "🚀 ~ file: Character.ts:411 ~ Test ~ create ~ address",
            address
          );
          this.cameras.main.setBounds(
            0, // 타일의 처음 지점.
            this.bg.height,
            this.bg.width, //타일의 끝지점으로.
            this.bg.height
          );
          return;
        }
        if (address === "webRTC") {
          this.cameras.main.setBounds(
            -380, // 타일의 처음 지점.
            this.bg.height,
            1100, //타일의 끝지점으로.
            1000
          );
        }
      },
    };
    observer.addObserver(observer_event);
  }
  update() {
    this.setCollider();
    this.main_char.updateAnimations();

    //test
    this.scene_finder?.finderClass.map((finder: FinderType) => {});
  }
}
