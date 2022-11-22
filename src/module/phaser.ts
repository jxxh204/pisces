import * as Phaser from 'phaser';
import The71_pink from "../assets/pink.svg";
import background from "../assets/images/background.jpg"

export class Sprites extends Phaser.Scene
{
   bg:any
   player:any
   platforms:any
   cursors:any;

    constructor ()
    {
        super();
        this.bg = {}
        this.player = {}
        this.platforms = {}
        this.cursors = {}
    }

    preload ()
    {
      this.load.image('background', background);
      this.load.image('The71_pink', The71_pink);
      this.load.spritesheet('The71_pink', The71_pink,{ frameWidth: 32, frameHeight: 48 })
    }

    create ()
    {
      this.bg = this.add.image(0, 300, 'background');
      this.platforms = this.physics.add.staticGroup();
      // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      this.player = this.physics.add.sprite(400, 300, 'The71_pink');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('The71_pink', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'The71_pink', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('The71_pink', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update ()
    {
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-500);
    }
    }
}