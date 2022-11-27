import * as Phaser from 'phaser';
import background from "../assets/images/background.jpg"
import M_idle from "../assets/Mushroom-Forrest/idle.png"
import M_jump from "../assets/Mushroom-Forrest/jump.png"
import M_run from "../assets/Mushroom-Forrest/run.png"

const Mushrooms:Mushrooms = {
  idle:M_idle,
  jump:M_jump,
  run:M_run
}


export class Sprites extends Phaser.Scene
{
   bg:any
   player:Sprites
   jump_player:Sprites
   platforms:any
   cursors:any;
   playerLocation:object
   imageSet:string

    constructor ()
    {
        super();
        this.bg = {}
        this.player = {} as Sprites
        this.jump_player = {} as Sprites
        this.platforms = {}
        this.cursors = {}
        this.imageSet = ""
        this.playerLocation = {
          w:window.innerWidth/2,
          h:window.innerHeight
        }
    }

    preload ()
    {
      this.load.image('background', background);
      // this.load.image('player1', Mushrooms.idle1);
      this.load.spritesheet('idle_player1', Mushrooms["idle"],{ frameWidth: 20, frameHeight: 28 })
      this.load.spritesheet('jump_player1', Mushrooms["jump"],{ frameWidth: 20, frameHeight: 28 })
    }

    create ()
    {
      this.bg = this.add.image(400, 300, 'background');
      this.platforms = this.physics.add.staticGroup();

      this.player = this.physics.add.sprite(this.playerLocation.w, this.playerLocation.h, 'idle_player1');
      this.jump_player = this.physics.add.sprite(this.playerLocation.w+50, this.playerLocation.h,"jump_player1")

      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.jump_player.setBounce(0.2);
      this.jump_player.setCollideWorldBounds(true);

      // 
      this.anims.create( {
          key: 'idle',
          frames: this.anims.generateFrameNames('idle_player1',{start:0, end:7}),
          frameRate: 4,
          repeat: -1
      });
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNames('jump_player1',{start:0, end:7}),
        frameRate: 6,
        repeat: 0
    });



      this.player.play("idle") // idle 모션 실행.

        this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용

    }

    update ()
    {
      if(this.cursors.space.isDown) {
        this.jump_player.setVelocityY(800);
      this.jump_player.play("jump")

      }

      // if (this.cursors.left.isDown)
      // {
      //     this.player.setVelocityX(-160);
      
      //     this.player.anims.play('left', true);
      // }
      // else if (this.cursors.right.isDown)
      // {
      //     this.player.setVelocityX(160);
      
      //     this.player.anims.play('right', true);
      // }
      // // else
      // // {
      // //     this.player.setVelocityX(0);
      
      // //     this.player.anims.play('turn');
      // // }
      
      // if (this.cursors.up.isDown && this.player.body.touching.down)
      // {
      //     this.player.setVelocityY(-330);
      // }
    }
}