import { SceneData } from "../type/Timeline";

export class FadeScene extends Phaser.Scene {
  constructor() {
    super("fade");
  }

  private timelineID = "";

  init(data: SceneData) {
    this.timelineID = data.timelineID;
  }

  create() {
    const { width, height } = this.game.canvas;
    const padding = 10;

    const targetObj = this.add
      .text(padding, height - padding * 4, "忘れ物", {
        fontSize: "30px",
        fontFamily: "Hiragino Mincho PRO W3",
      })
      .setAlpha(0);

    this.tweens.add({
      targets: targetObj,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });

    const zone = this.add.zone(width / 2, height / 2, width, height);

    zone.setInteractive({
      useHandCursor: true,
    });

    zone.on("pointerdown", () => {
      this.scene.start("main", { timelineID: this.timelineID });
    });
  }
}
