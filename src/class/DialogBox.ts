export type DialogBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  padding?: number;
  margin?: number;
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class DialogBox extends Phaser.GameObjects.Container {
  private box: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;
  private actorNameBox: Phaser.GameObjects.Rectangle;
  private actorNameText: Phaser.GameObjects.Text;
  private textPrompt: Phaser.GameObjects.Triangle;
  private padding: number;
  private margin: number;
  private textAnimating = false;

  private eventCounter = 0;
  private dialog: string[] = [""];
  private dialogSpeed = 5;
  private timedEvent: Phaser.Time.TimerEvent | undefined;

  constructor(
    public scene: Phaser.Scene,
    {
      x,
      y,
      width,
      height,
      padding = 10,
      margin = 10,
      textStyle = {},
    }: DialogBoxConfig
  ) {
    super(scene, 0, 0);

    this.padding = padding;
    this.margin = margin;

    this.box = new Phaser.GameObjects.Rectangle(
      this.scene,
      x,
      y,
      width,
      height,
      0x000000
    ).setStrokeStyle(1, 0xffffff);
    this.add(this.box);

    const dialogBoxTextStyle = {
      ...textStyle,
      wordWrap: { width: width - padding * 2, useAdvancedWrap: true },
    };

    this.text = new Phaser.GameObjects.Text(
      this.scene,
      x - width / 2 + padding,
      y - height / 2 + padding,
      "",
      dialogBoxTextStyle
    );
    this.add(this.text);

    // actor name box
    this.actorNameBox = new Phaser.GameObjects.Rectangle(
      this.scene,
      x - width / 2,
      y - height / 2 - margin,
      0,
      40,
      0x000000
    ).setStrokeStyle(1, 0xffffff);
    this.actorNameBox.setOrigin(0, 1);
    this.actorNameBox.setVisible(false);
    this.add(this.actorNameBox);

    // actor name text
    this.actorNameText = new Phaser.GameObjects.Text(
      this.scene,
      x - width / 2 + padding,
      y - height / 2 - margin - 20,
      "",
      textStyle
    );
    this.actorNameText.setOrigin(0, 0.5);
    this.actorNameText.setVisible(false);
    this.add(this.actorNameText);

    this.padding = padding;

    this.textPrompt = new Phaser.GameObjects.Triangle(
      this.scene,
      x + width / 2 - padding * 4,
      y + padding * 2,
      0,
      32,
      32,
      32,
      16,
      64,
      0x4169a1
    );
    this.add(this.textPrompt);
    this.scene.tweens.add({
      targets: this.textPrompt,
      yoyo: true,
      alpha: 0.2,
      repeat: -1,
      duration: 800,
    });
    this.textPrompt.setOrigin(0, 0.5);
    this.textPrompt.setVisible(false);
  }

  // Sets the text for the dialog window
  public setText(text: string, animate: boolean) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split("");
    if (this.timedEvent) {
      this.timedEvent.remove();
    }
    const tempText = animate ? "" : text;
    this._setText(tempText);
    if (text.length === 0) return;
    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - this.dialogSpeed * 30,
        callback: () => {
          this._animateText();
        },
        callbackScope: this,
        loop: true,
      });
    }
  }

  private _setText(text: string) {
    // Reset the dialog
    // FIXME: 最初に作ったthis.textのstyle propertyを再利用したい
    if (this.text) this.text.destroy();
    this.text = this.scene.add.text(this.text.x, this.text.y, text, {
      fontSize: "24px",
      wordWrap: { width: this.box.width, useAdvancedWrap: true },
    });
    this.text.setPadding(0, 2, 0, 2);
    this.add(this.text);
  }

  // Slowly displays the text in the window to make it appear annimated.
  // Use for event callback function.
  private _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    this.textAnimating = true;
    if (this.eventCounter === this.dialog.length && this.timedEvent) {
      this.textAnimating = false;
      this.timedEvent.remove();
    }
    this.togglePrompt();
  }

  public setActorNameText(name: string) {
    this.actorNameText.setText(name);

    const bounds = this.actorNameText.getBounds();
    this.actorNameBox.width = bounds.width + this.padding * 2;

    // this.actorNameBox.geom.width = this.actorNameBox.width;
    // this.actorNameBox.updateData();

    this.actorNameBox.setVisible(true);
    this.actorNameText.setVisible(true);
  }

  public clearActorNameText() {
    this.actorNameBox.setVisible(false);
    this.actorNameText.setVisible(false);
  }

  private togglePrompt() {
    if (this.textAnimating) {
      this.textPrompt.setVisible(false);
    } else {
      this.textPrompt.setVisible(true);
    }
  }
}
