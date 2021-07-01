import Phaser from 'phaser'
import vars from './vars.js'
import game from './index.js'

let centerX = vars.width/2
let centerY = vars.height/2

class CardContainer extends Phaser.GameObjects.Container{
    constructor(obj){
        let base = new Phaser.Physics.Arcade.Sprite(obj.scene,0,0,'planeCard').setScale(0.18)
        let icon = new Phaser.GameObjects.Image(obj.scene,0,0,obj.key).setScale(0.2).setVisible(false)
        let scene = obj.scene
        
        super(obj.scene,obj.x,obj.y,[base,icon],true,false)

        this.org ={x:obj.x,y:obj.y}
        this.scene = scene
        this.base = base
        this.icon = icon
        this.dragging = false
        this.setActive(false)
      
        this.enabled = false
        this.clicks = 2   
        this.base.setInteractive({draggable:true})
        
        
        // bind click event
        this.base.on('pointerdown',(event)=>{
            this.enabled = true
            this.icon.setVisible(this.enabled)
            
            //bind events
            if (this.enabled && --this.clicks == 0){
                this.base.on('drag',(mouse)=>{
                    this.dragging = true
                    this.copyPosition({x:mouse.position.x,y:mouse.position.y})
                })
            }
        })


    }
    disableInteractive(){
        this.base.disableInteractive()
    }
    enableInteractive(){
        this.base.setInteractive()
    }
    

}

export default CardContainer