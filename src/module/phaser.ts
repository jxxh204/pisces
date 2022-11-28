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


export class Sprites extends Phaser.Scene
{
   bg:object
   player:Sprites
   playerState:string
   jump_player:Sprites
   walk_player:Sprites
   platforms:any
   cursors:any;
   playerLocation:object

    constructor ()
    {
        super();
        this.bg = {}
        this.player = {} as Sprites
        this.playerState = "_idle"
        this.jump_player = {} as Sprites
        this.walk_player = {} as Sprites
        this.platforms = {}
        this.cursors = {}
        this.playerLocation = {
          w:window.innerWidth/2,
          h:window.innerHeight
        }
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

        this.cursors = this.input.keyboard.createCursorKeys(); // 키보드 사용

    }

    update ()
    {

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-40);
        this.player.anims.play('left',true);
      } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(40);
          this.player.anims.play('right', true);
      } else if(this.cursors.space.isDown) {
        console.log(this.playerState )
        this.playerState = "_jump"
        this.player.setVelocityY(300);
        this.player.play("jump")

      } else {
        if(this.playerState === "_jump") { //점프를 누른 후
          setTimeout(() => {
            this.playerState = "_idle"
            this.player.play("idle",true)
          },500)
        } else {
          this.player.setVelocityX(0);
          this.playerState = "_idle"
          this.player.play("idle",true)
        }

        // this.walk_player.anims.play('left', true);
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