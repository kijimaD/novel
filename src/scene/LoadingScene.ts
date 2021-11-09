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
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#ffffff");
    const { width, height } = this.game.canvas;

    const A = this.add.circle(100, 50, 172, 0x0000ff);
    // .setBlendMode(Phaser.BlendModes.ERASE);
    const B = this.add.circle(500, 850, 128, 0x007fff);
    // .setBlendMode(Phaser.BlendModes.ERASE);
    const C = this.add.circle(0, 1200, 64, 0x00ffff);
    // .setBlendMode(Phaser.BlendModes.ERASE);

    const text = this.add.text(100, 200, "PURPLE", {
      fontSize: "50px",
      fontFamily: "Hiragino Mincho PRO W3",
    });
    text.setFill("#ffffff").setAlpha(0);

    this.time.delayedCall(400, () => {
      this.tweens.add({
        targets: text,
        x: 140,
        duration: 400,
        ease: "Power2",
        alpha: 1,
      });
    });

    this.tweens.add({
      targets: [A, B, C],
      x: 200,
      y: 200,
      duration: 1000,
      ease: "Power2",
    });

    this.load.on("complete", () => {
      this.time.delayedCall(1600, () => {
        this.tweens.add({
          targets: [text, A, B, C],
          x: 180,
          y: 200,
          duration: 1000,
          ease: "Power2",
          alpha: 0,
        });
        this.time.delayedCall(1600, () => {
          this.scene.start("title");
        });
      });
    });

    this.load.start();
  }
}
