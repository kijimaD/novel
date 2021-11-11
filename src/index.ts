import * as Phaser from "phaser";
import { WebFontLoaderPlugin } from "phaser3-webfont-loader";
import { Scenes } from "./scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-app",
  scene: Scenes,
  dom: {
    createContainer: true,
  },
  plugins: {
    global: [
      {
        key: "WebFontLoader",
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
};

new Phaser.Game(config);
