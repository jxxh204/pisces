import * as Phaser from 'phaser';
import background from "../assets/images/background.jpg"
import M_idle from "../assets/Mushroom-Forrest/idle.png"
import M_jump from "../assets/Mushroom-Forrest/jump.png"
import M_walk from "../assets/Mushroom-Forrest/walk.png"
import M_run from "../assets/Mushroom-Forrest/run.png"

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
      this.load.image('background', background);
      // this.load.image('player1', Mushrooms.idle1);
      this.load.spritesheet('player_idle', Mushrooms["idle"],{ frameWidth: 32, frameHeight: 28 })
      this.load.spritesheet('player_jump', Mushrooms["jump"],{ frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet('player_walk', Mushrooms["walk"],{ frameWidth: 32, frameHeight: 28 })
    }

    create ()
    {
      this.bg = this.add.image(400, 300, 'background');
      this.platforms = this.physics.add.staticGroup();

      this.player = this.physics.add.sprite(this.playerLocation.w, this.playerLocation.h, `player${this.playerState}`);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

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

      // console.log(this.player.y)
       if (this.cursors.left.isDown) {//왼쪽
        console.log("left")
        this.playerState = "walk"
        this.player.setVelocityX(-40);
        this.player.anims.play('left',true);
        this.sameTimeMotionHandler("left");
      } else if (this.cursors.right.isDown) { // 오른쪽
        this.playerState = "walk"
        this.player.setVelocityX(40);
        this.player.anims.play('right', true);
        this.sameTimeMotionHandler("right");
      } else if(this.cursors.space.isDown) {// 점프

          this.playerState = "_jump"
          this.player.setVelocityY(300);
          this.player.play("jump")
        this.sameTimeMotionHandler("space");
      } else { // 기본상태.
        this.sameTimeMotionHandler("idle");

        // if(this.playerLocation.currentY === this.player.y){
        //   this.isBehavior = false;
        // }

        // console.log(this.motionState)
        // if(this.playerMotion === "normal") {
          // motionStateArray.map((motion:MotionStatus) => {
          //   if(this.motionState[motion]){
          //     this.isBehavior = true;
          //   }
          // });
          if(!this.isBehavior) {
            this.player.setVelocityX(0);
            this.playerState = "_idle"
            this.player.play("idle",true)
            this.isBehavior = false;
          }
        // }
      }
    }
    
    sameTimeMotionHandler(motion:MotionStatus) { // jump
      let isMotion = true;
      if(motion === "idle") {
          motionStateArray.map((motion:MotionStatus) => {
            if(!this.motionState[motion]){
              isMotion = false;
            } else {
              this.isBehavior = true;
              return;
            }
          });
          if(!isMotion) { //모션이 없다면
            // conosle
            this.isBehavior = false; // idle모드
          }
      } else if(!this.motionState[motion]) {
        this.motionState[motion] = true;
      }
    }
}