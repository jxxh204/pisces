import * as Phaser from 'phaser';

export default class Welcome extends Phaser.Scene
{
    constructor ()
    {
      super('Welcome');
    }
    create ()
    {
      this.add.text(20, 20, 'Loading..')

      setTimeout(() => {
        this.scene.start('Level1')
      }, 2000)
    }

}