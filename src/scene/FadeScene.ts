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
        fontFamily: "Zen Antique",
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

    const duration_ms = 1000;
    zone.on("pointerdown", () => {
      this.tweens.add({
        targets: targetObj,
        alpha: 0,
        duration: duration_ms,
        ease: "Power2",
      });

      this.time.delayedCall(duration_ms, () => {
        this.scene.start("main", { timelineID: this.timelineID });
      });
    });
  }
}
