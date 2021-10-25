export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    this.load.image('logo', '//cdn.pixabay.com/photo/2021/09/23/09/01/swan-6649194_1280.jpg');
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width/2, height/2, 'logo');

    this.add.text(width/2, height/2 + 60, 'Loading...').setOrigin(0.5);

    this.load.image('street', '//cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg');
    this.load.image('robot', '//cdn.pixabay.com/photo/2017/07/27/09/56/sphere-stone-2544690_1280.png');
    this.load.audio('lock_click', '../assets/sound/lock_click.wav')

    this.load.on('complete', () => {
      this.scene.start('title');
    });

    this.load.start();
  }
}
