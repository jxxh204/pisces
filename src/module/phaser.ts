import * as Phaser from 'phaser';
import The71_pink from "../assets/pink.svg";
import background from "../assets/images/background.jpg"
import M_idle from "../assets/Mushroom-Forrest/idle.png"
import M_jump from "../assets/Mushroom-Forrest/jump.png"
import M_run from "../assets/Mushroom-Forrest/run.png"

const Mushrooms = {
  idle:M_idle,
  jump:M_jump,
  run:M_run
}

export class Sprites extends Phaser.Scene
{
   bg:any
   player:any
   platforms:any
   cursors:any;
   playerLocation:object

    constructor ()
    {
        super();
        this.bg = {}
        this.player = {}
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
      this.load.spritesheet('player1', Mushrooms.idle,{ frameWidth: 20, frameHeight: 28 })
      // this.load.spritesheet('player1_run ', Mushrooms.run,{ frameWidth: 32, frameHeight: 48 })
    }

    create ()
    {
      this.bg = this.add.image(400, 300, 'background');
      this.platforms = this.physics.add.staticGroup();

      this.player = this.physics.add.sprite(this.playerLocation.w, this.playerLocation.h, 'player1');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      // 
       const animConfig= {
          key: 'idle',
          frames: this.anims.generateFrameNames('player1',{start:0, end:1}),
          frameRate: 4,
          repeat: -1
      };
      
      this.anims.create(animConfig)



      this.player.play('idle')

        this.cursors = this.input.keyboard.createCursorKeys();
        // const lancelot = this.add.sprite(500, 536)
        // lancelot.setOrigin(0.5, 1);
        // lancelot.setScale(8);
        // lancelot.play('idle');

    }

    update ()
    {
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