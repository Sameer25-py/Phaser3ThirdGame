import Phaser from 'phaser';
import MainScene from './MainScene'
import vars from './vars.js'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: vars.width,
    height: vars.height,
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    loader:{
        baseURL: 'src/',
        path: 'assets/'
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    backgroundColor:0xFFFFFF,
    scene: [MainScene]
};

const game = new Phaser.Game(config);

export default game
