import { DialogBox, DialogBoxConfig } from '../class/DialogBox';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
  }

  create() {
    const {width, height} = this.game.canvas;

    this.add.image(width/2, height/2, 'street');

    // font
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: '"Helvetica Neue", Arial, "Hiragino kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: '24px'
    }

    // dialogbox
    const dialogBoxHeight = 150;
    const dialogBoxMargin = 10;
    const dialogBoxConfig: DialogBoxConfig = {
      x: width/2,
      y: height - dialogBoxMargin - dialogBoxHeight/2,
      width: width - dialogBoxMargin*2,
      height: dialogBoxHeight,
      padding: 10,
      margin: dialogBoxMargin,
      textStyle: textStyle
    };

    const dialogBox = new DialogBox(this, dialogBoxConfig);

    dialogBox.setText('クリックでエンディングへ▼');
    dialogBox.setActorNameText('NAME');

    this.add.existing(dialogBox);

    const zone = this.add.zone(width/2, height/2, width, height);
    zone.setInteractive({
      useHandCursor: true
    });
    zone.on('pointerdown', () => {
      this.scene.start('ending');
    });
  }
}
