import { DialogBox, DialogBoxConfig } from "../class/DialogBox";
import { TimelinePlayer } from "../class/TimelinePlayer";
import { Timeline, SceneData } from "../type/Timeline";
import { timelineData } from "../data/timeline";

export class MainScene extends Phaser.Scene {
  private timeline?: Timeline;

  constructor() {
    super("main");
  }

  init(data: SceneData) {
    const timelineID = data.timelineID || "start";

    if (!(timelineID in timelineData)) {
      console.error(
        `[ERROR] タイムラインID[${timelineID}]は登録されていません`
      );
      this.scene.start("title");
      return;
    }

    this.timeline = timelineData[timelineID];
  }

  create() {
    if (!this.timeline) {
      return;
    }

    const { width, height } = this.game.canvas;

    // font
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "Noto Serif JP",
      fontSize: "24px",
    };

    // dialogbox
    const dialogBoxHeight = 150;
    const dialogBoxMargin = 10;
    const dialogBoxConfig: DialogBoxConfig = {
      x: width / 2,
      y: height - dialogBoxMargin - dialogBoxHeight / 2,
      width: width - dialogBoxMargin * 2,
      height: dialogBoxHeight,
      padding: 10,
      margin: dialogBoxMargin,
      textStyle: textStyle,
    };

    const dialogBox = new DialogBox(this, dialogBoxConfig);

    const timelinePlayer = new TimelinePlayer(this, dialogBox, textStyle);

    timelinePlayer.start(this.timeline);
  }
}
