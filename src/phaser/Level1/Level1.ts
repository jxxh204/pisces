import * as Phaser from 'phaser';
import M_idle from "@/assets/Mushroom-Forrest/idle.png"
import M_jump from "@/assets/Mushroom-Forrest/jump.png"
import M_walk from "@/assets/Mushroom-Forrest/walk.png"
import M_run from "@/assets/Mushroom-Forrest/run.png"
// map
import tilesImg from "./Tiles.png"

const Mushrooms:Mushrooms = {
  idle:M_idle,
  jump:M_jump,
  walk:M_walk,
  run:M_run
}
const motionStateArray = ["up" , "down" , "left" , "right" , "space" , "shift","idle"]



export default class Level1 extends Phaser.Scene
{
   bg:object
   player:Sprites
   playerState:string
   platforms:any
   cursors:any;
   playerLocation:object
   isBehavior: boolean
   motionState:Motions
   sameTimeMotionInterval:NodeJS.Timeout

    constructor ()
    {
      super({
        key: "Level1", // 여러 scene을 사용할려면 키입력해야함.
        active:false
    });
        this.bg = {}
        this.player = {} as Sprites
        this.playerState = "_idle"
        this.isBehavior = false;
        this.motionState = {
          up:false,
          down:false,
          left:false,
          right:false,
          space:false,
          shift:false,
        }
        this.platforms = {}
        this.cursors = {}
        this.playerLocation = {
          w:100,
          h:window.innerHeight,
          currentY:0
        }
        this.sameTimeMotionInterval = {} as NodeJS.Timeout
    }
    loadMap(){
      this.load.image('tileSetImage', tilesImg);
      this.load.tilemapTiledJSON('Level1', "src/phaser/Level1/tileset1.json")//무조건 주소 자체를 넣어야함.
    }
    createMap(){
      const map = this.make.tilemap({ key: 'Level1'});
      // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}
      const tileset = map.addTilesetImage('Tiles', 'tileSetImage');
    
      const objectH = -this.game.scale.baseSize.height // zoom에 따라 맵이 맞게 배치되도록
      console.log("🚀 ~ file: Level1.ts:68 ~ createMap ~ this.game.scale", this.game.scale)
      const tree = map.createLayer('tree', tileset,0,objectH)
      // map.createStaticLayer('background', tileset,0,objectH)
      map.createLayer('jump', tileset,0,objectH)
      map.createLayer('floor', tileset,0,objectH) //프로그램에서 설정한 레이어 불러옴.
    }
    loadPlayer() {
      this.load.spritesheet('player_idle', Mushrooms["idle"],{ frameWidth: 32, frameHeight: 28 })
      this.load.spritesheet('player_jump', Mushrooms["jump"],{ frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet('player_walk', Mushrooms["walk"],{ frameWidth: 32, frameHeight: 28 })
    }
    createPlayer() {
      this.player = this.physics.add.sprite(this.playerLocation.w, this.playerLocation.h, `player${this.playerState}`);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
    }
    createCamera() {
      this.cameras.main.setBounds(0, 0, 3392, -200);
      this.physics.world.setBounds(0, 0, 3392,300); // 캐릭터 위치 조정
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08); // 카메라를 플레이어에 맞춤
      this.cameras.main.centerOn(0,0); // 카메라가 따라다님.- 배경 끝에 가까워지면 자동으로 벽으로감.
      this.cameras.main.pan(0, 0, 0);
    }
    preload ()
    {
      this.loadPlayer();
      this.loadMap();
    }

    create ()
    {
      this.createMap();
      this.createPlayer();
      this.createCamera();

      // this.bg = this.add.image(400, 300, 'background');
      // this.platforms = this.physics.add.staticGroup();

      // this.player.setAngle(90) - 각도 바꿈.
      
      // 애니메이션
      this.anims.create( {
          key: 'idle',
          frames: this.anims.generateFrameNames('player_idle',{start:0, end:1}),
          frameRate: 4,
          repeat: -1
      });
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNames('player_jump',{start:0, end:7}),
        frameRate: 16,
        repeat: 0
      });
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('player_walk',{start:0, end:3}),
        frameRate: 8,
        repeat: 0
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('player_walk',{start:0, end:3}),
        frameRate: 8,
        repeat: 0
      });

      this.player.play("idle",true) // idle 모션 실행.
      // this.playerLocation.currentY = this.player.y
      // this.playerLocation.currentY = 424;
      this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용

    }
    update () {
       if (this.cursors.left.isDown) {//왼쪽
        this.playerState = "walk"
        this.player.setVelocityX(-40);
        this.player.anims.play('left',true);
        this.sameTimeMotionHandler("left");

      } else if (this.cursors.right.isDown) { // 오른쪽
        this.playerState = "walk"
        this.player.setVelocityX(40);
        this.player.anims.play('right', true);
        this.sameTimeMotionHandler("right");

      } else { // 기본상태.
        this.sameTimeMotionHandler("idle");
          if(!this.isBehavior) {
            this.player.setVelocityX(0);
            this.playerState = "_idle"
            this.player.play("idle",true)
            this.isBehavior = false;
          }
      }
      if(this.cursors.space.isDown) {// 점프

        this.playerState = "_jump"
        this.player.setVelocityY(300);
        this.player.play("jump")
        this.sameTimeMotionHandler("space");
      }
    }
    
    sameTimeMotionHandler(motion:MotionStatus) { // jump
      let isMotion = true;
      if(motion === "idle") {
          motionStateArray.map((motion:MotionStatus) => {
            if(!this.motionState[motion]){
              isMotion = false;
            } else {
              isMotion = true;
              return;
            }
          });
          if(!isMotion) { //모션이 없다면
            this.isBehavior = false; // idle모드
          }
      } else if(!this.motionState[motion]) {
        this.motionState[motion] = true;
      }
    }
}