import * as Phaser from "phaser";

type ProgressOptionType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Welcome extends Phaser.Scene {
  progressOption: ProgressOptionType;

  constructor() {
    super({ key: "Welcome" });
    this.progressOption = {
      width: 320,
      height: 50,
      x: 0,
      y: 0,
    };
  }
  imageLoad() {
  }
  progressLoad() {
    this.progressOption = {
      width: 600,
      height: 80,
      x: this.scale.baseSize.width / 2 - this.progressOption.width / 2,
      y: this.scale.baseSize.height / 2 - this.progressOption.height / 2,
    };
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      this.progressOption.x,
      this.progressOption.y,
      this.progressOption.width,
      this.progressOption.height
    );
    this.add.text(
      this.progressOption.x,
      this.progressOption.y - 60,
      "Loading..",
      {"fontSize":"60px"}
    );
    

    progressBar.clear();
    let value = 0.2;

    const progressInterval = setInterval(() => {
      value += 0.05;
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        this.progressOption.x + 12,
        this.progressOption.y + 12,
        this.progressOption.width * value-24,
        this.progressOption.height-24
      );
      if (value > 1) {
        clearInterval(progressInterval);
        this.scene.start("Game1");
        // progressBar.destroy();
        // progressBox.destroy();
      }
    }, 100);
  }
  preload() {
    this.imageLoad();
    this.progressLoad();
  }
  create() {

  }
}
