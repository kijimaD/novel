export class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loading");
  }

  preload() {
    this.load.image("title", "assets/image/smoke.png");
    this.load.image("station", "assets/image/station.png");
    this.load.image("red", "assets/image/red.png");

    this.load.audio("train", "assets/sound/train.mp3");
    this.load.audio("lock_click", "assets/sound/lock_click.wav");
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.text(width / 2, height / 2 + 60, "Loading...").setOrigin(0.5);

    this.load.on("complete", () => {
      this.scene.start("title");
    });

    this.load.start();
  }
}
