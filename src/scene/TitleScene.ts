export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    const { width, height } = this.game.canvas;
    const padding = 100

    this.add.image(width/2, height/2, 'logo');
    this.add.text(padding, height/4, '流砂', { fontSize: '30px', fontFamily: 'Hiragino Mincho PRO W3' })

    const zone = this.add.zone(width/2, height/2, width, height);

    zone.setInteractive({
      useHandCursor: true
    });

    zone.on('pointerdown', () => {
      this.sound.play('lock_click');
      this.scene.start('main', { timelineID: 'start' });
    });
  }
}
