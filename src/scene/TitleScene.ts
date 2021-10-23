export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width/2, height/2, 'logo');
    this.add.text(width/2, height/2+60, 'クリックでスタート').setOrigin(0.5);

    const zone = this.add.zone(width/2, height/2, width, height);

    zone.setInteractive({
      useHandCursor: true
    });

    zone.on('pointerdown', () => {
      this.scene.start('main', { timelineID: 'start' });
    });
  }
}
