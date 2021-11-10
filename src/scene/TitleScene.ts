export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  create() {
    const { width, height } = this.game.canvas;
    const padding = 200;

    const background = this.add
      .image(width / 2, height / 2, "title")
      .setAlpha(0);
    const title = this.add
      .text(width - padding / 2, height - padding, "忘れ物", {
        fontSize: "30px",
        fontFamily: "Hiragino Mincho PRO W3",
      })
      .setAlpha(0);

    this.tweens.add({
      targets: background,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });

    this.time.delayedCall(1000, () => {
      this.tweens.add({
        targets: title,
        alpha: 1,
        duration: 3000,
        ease: "Power2",
      });
    });

    const zone = this.add.zone(width / 2, height / 2, width, height);

    zone.setInteractive({
      useHandCursor: true,
    });

    zone.on("pointerdown", () => {
      // this.sound.play("lock_click");
      this.scene.start("main", { timelineID: "start" });
    });
  }
}
