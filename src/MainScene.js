import Phaser from 'phaser'
import GameManager from './GameManager.js'
import CardContainer from './CardContainer'

class MainScene extends Phaser.Scene{

    constructor(){
        super('MainScene')
    }

    preload(){

        this.load.image('planeCard','planecard.png')
        this.load.image('jelly1','jelly1.png')
        this.load.image('jelly2','jelly2.png')
        this.load.image('jelly3','jelly3.png')
    }

    create(){
        this.cardGrid = new GameManager({
            scene:this,
            world:this.physics.world
        })

        this.cardGrid.spawnCardGrid()
    }
}

export default MainScene