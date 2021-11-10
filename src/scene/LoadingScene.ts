declare const NODE_ENV: string;

export class LoadingScene extends Phaser.Scene {
  private icon?: Phaser.GameObjects.Image;
  private text?: Phaser.GameObjects.Text;

  constructor() {
    super("loading");
  }

  preload() {
    this.load.image("kijimad", "assets/image/kijimad.png");
    this.load.image("title", "assets/image/smoke.png");
    this.load.image("station", "assets/image/station.png");
    this.load.image("red", "assets/image/red.png");

    this.load.audio("train", "assets/sound/train.mp3");
    this.load.audio("lock_click", "assets/sound/lock_click.wav");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.icon = this.add
      .image(width / 2, height / 2, "kijimad")
      .setScale(0.5)
      .setAlpha(0);

    this.text = this.add
      .text(width / 2 - 20, height / 2 + 60, "kijimaD", {
        fontSize: "20px",
        fontFamily: "Hiragino Mincho PRO W3",
      })
      .setFill("#ffffff")
      .setAlpha(0);

    this.text_animation();
    this.icon_animation();
    this.transition_delay();

    this.load.start();
  }

  private text_animation() {
    this.time.delayedCall(200, () => {
      this.tweens.add({
        targets: this.text,
        duration: 400,
        ease: "Power2",
        alpha: 1,
      });
    });
  }

  private icon_animation() {
    this.tweens.add({
      targets: this.icon,
      duration: 400,
      ease: "Power2",
      alpha: 1,
    });
  }

  private transition_delay() {
    this.load.on("complete", () => {
      this.time.delayedCall(800, () => {
        this.tweens.add({
          targets: [this.text, this.icon],
          duration: 1000,
          ease: "Power2",
          alpha: 0,
        });
        this.time.delayedCall(800, () => {
          this.scene.start("title");
        });
      });
    });
  }
}
