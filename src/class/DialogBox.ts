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
  private textPrompt: Phaser.GameObjects.DOMElement;
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

    this.textPrompt = this.scene.add.dom(
      x + width / 2 - padding * 2,
      y + height / 2 - padding * 2,
      "div",
      "width: 0; height: 0; border-style: solid; border-width: 1em 0.5em 0 0.5em; border-color: #007bff transparent transparent transparent;",
      ""
    );
    this.textPrompt.setPerspective(1000);
    this.textPrompt.rotate3d.set(0, 1, 0, 0);
    this.textPrompt.setVisible(false);

    this.scene.tweens.add({
      targets: this.textPrompt.rotate3d,
      w: 180,
      duration: 800,
      ease: "linear",
      repeat: -1,
    });
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
    // FIXME: ??????????????????this.text???style property?????????????????????
    if (this.text) this.text.destroy();
    this.text = this.scene.add.text(this.text.x, this.text.y, text, {
      fontSize: "24px",
      fontFamily: "Noto Serif JP",
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
