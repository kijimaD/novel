export class EndingScene extends Phaser.Scene {
  constructor() {
    super("ending");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width / 2, height / 2, "title");
    this.add
      .text(width / 2, height / 2, "おわり", {
        fontSize: "30px",
        fontFamily: "Noto Serif JP",
      })
      .setOrigin(0.5);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true,
    });
    zone.on("pointerdown", () => {
      this.scene.start("title");
    });
  }
}
