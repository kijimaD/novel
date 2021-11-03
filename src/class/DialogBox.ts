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
  private textPrompt: Phaser.GameObjects.Text;
  private padding: number;

  private eventCounter = 0;
  private dialog = new Array();
  private dialogSpeed = 1;
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

    // text prompt
    this.textPrompt = new Phaser.GameObjects.Text(
      this.scene,
      x + width / 2 - padding * 4,
      y + height / 4,
      "",
      textStyle
    );
    this.add(this.textPrompt);
    const promptCharacter = "▼";
    this.textPrompt.setText(promptCharacter).setAlpha(0.8);
  }

  // Sets the text for the dialog window
  public setText(text: string, animate: boolean) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split("");
    if (this.timedEvent) {
      this.timedEvent.remove();
    }
    var tempText = animate ? "" : text;
    this._setText(tempText);
    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - this.dialogSpeed * 30,
        callback: this._animateText,
        callbackScope: this,
        loop: true,
      });
    }
  }

  private _setText(text: string) {
    // Reset the dialog
    if (this.text) this.text.destroy();
    var x = this.padding + 10;
    // var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
    var y = 100;
    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: { width: 100 - this.padding * 2 - 25 },
      },
    });
  }

  // Slowly displays the text in the window to make it appear annimated.
  // Use for event callback function.
  private _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length && this.timedEvent) {
      this.timedEvent.remove();
    }
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
}
