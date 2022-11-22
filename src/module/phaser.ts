import * as Phaser from 'phaser';
import pink1 from "../assets/pink.svg";
import background from "../assets/images/background.jpg"

export class Sprites extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
  this.load.image('background', background);

    }

    create ()
    {
  this.add.image(400, 300, 'background');

        // this.bg = this.add.tileSprite(0, 38, 800, 296, 'sky').setOrigin(0, 0);
        // this.trees = this.add.tileSprite(0, 280, 800, 320, 'trees').setOrigin(0, 0);

        // const animConfig = {
        //     key: 'walk',
        //     frames: 'walker',
        //     frameRate: 60,
        //     repeat: -1
        // };

        // this.anims.create(animConfig);

        // const sprite = this.add.sprite(400, 484, 'walker', 'frame_0000');

        // sprite.play('walk');
    }

    update ()
    {
        // this.bg.tilePositionX -= 2;
        // this.trees.tilePositionX -= 6;
    }
}