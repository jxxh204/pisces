import * as Phaser from 'phaser';
import background from "../assets/images/background.jpg"
import M_idle from "../assets/Mushroom-Forrest/idle.png"
import M_jump from "../assets/Mushroom-Forrest/jump.png"
import M_walk from "../assets/Mushroom-Forrest/walk.png"
import M_run from "../assets/Mushroom-Forrest/run.png"
import tileset_full from "../assets/template/tile1/tileset_full.png"

const Mushrooms:Mushrooms = {
  idle:M_idle,
  jump:M_jump,
  walk:M_walk,
  run:M_run
}
const motionStateArray = ["up" , "down" , "left" , "right" , "space" , "shift","idle"]


export class Sprites extends Phaser.Scene
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
        super();
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
          w:window.innerWidth/2,
          h:window.innerHeight,
          currentY:0
        }
        this.sameTimeMotionInterval = {} as NodeJS.Timeout
    }

    preload ()
    {
      // this.load.image('background', background);
      // this.load.image('player1', Mushrooms.idle1);
      this.load.spritesheet('player_idle', Mushrooms["idle"],{ frameWidth: 32, frameHeight: 28 })
      this.load.spritesheet('player_jump', Mushrooms["jump"],{ frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet('player_walk', Mushrooms["walk"],{ frameWidth: 32, frameHeight: 28 })

      this.load.image('tileSetImage', tileset_full);
      this.load.tilemapTiledJSON('tilemaps', "src/assets/template/tile1/tileset_full.json")//무조건 주소 자체를 넣어야함.
    }

    create ()
    {

      // this.bg = this.add.image(400, 300, 'background');
      // this.platforms = this.physics.add.staticGroup();

      this.player = this.physics.add.sprite(this.playerLocation.w, this.playerLocation.h, `player${this.playerState}`);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      
      const map = this.make.tilemap({ key: 'tilemaps'});
      // {tiled에서 설정한 타일셋 이름, 불러온 타일셋 이름}

     const tileset = map.addTilesetImage('tileset_full', 'tileSetImage'); //tileset_full 사이즈가 큰듯?

     const floorLayer = map.createStaticLayer('floor', tileset,300,400) //프로그램에서 설정한 레이어 불러옴.
     console.log("tileset",floorLayer)

      // map.createStaticLayer('Ground', tileset)
	
      // var layer = map.createLayer('World1', tileset, 0, 0);


      // this.platforms.create(400, window.innerHeight, 'floor').setScale(2).refreshBody();

      this.physics.add.collider(this.player, this.platforms); // player와 platforms이 닿을 수 있도록
      // startFollow(this.player); //카메라 센터

      // 카메라
      this.cameras.main.setBounds(0, 0, 3392, 100);
      this.physics.world.setBounds(0, 0, 3392, this.playerLocation.h);
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08); // 카메라를 플레이어에 맞춤
      // this.cameras.main.centerOn(0, 0); // 카메라가 따라다님.- 배경 끝에 가까워지면 자동으로 벽으로감.
  
      // this.cameras.main.setZoom(2);
      

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
      this.playerLocation.currentY = 424;
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