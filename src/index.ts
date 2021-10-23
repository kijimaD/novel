import * as Phaser from 'phaser';
import { Scenes } from './scene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-app',
  scene: Scenes
};

new Phaser.Game(config);
