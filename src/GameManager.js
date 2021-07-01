import CardContainer from './CardContainer.js'

class GameManager extends Phaser.Physics.Arcade.Group{
    constructor(obj){
        let icons = ['jelly1','jelly2','jelly3']
        let scene = obj.scene
        let startX = 200
        let startY = 100
        let incrementX = 200
        let incrementY = 200
        let rows = 3
        let columns = 3
        let clicks = 2
        
        super(obj.world,obj.scene)

        this.startX = startX
        this.startY = startY
        this.incrementX = incrementX
        this.incrementY = incrementY
        this.rows = rows
        this.columns = columns
        this.icons = icons
        this.scene = scene
        this.clicks = clicks
        this.child1 = null
        this.child2 = null
        this.bc1 = false
        this.bc2 = false
    }
    spawnCardGrid(){

        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.columns;j++){
                this.add(new CardContainer({
                    scene:this.scene,
                    key:this.icons[Phaser.Math.Between(0,2)],
                    x:this.startX,
                    y:this.startY
                }),true)
                this.startX += this.incrementX
            }
            this.startY += this.incrementY
            this.startX = 200
        }
        
        this.logicManager()
        
    }

    logicManager(){
        this.children.iterate(child=>{

            let base = child.getAt(0)
            
            base.on('pointerdown',()=>{
                if(child.enabled && this.child1 === null && this.child2 === null){
                    this.child1 = child
                    this.bc1 = true
                }
                else if(child.enabled && this.child1!==null && this.child1 !== child && this.child2 === null){
                    this.child2 = child
                    this.bc2 = true
                }
                if(this.bc1 && this.bc2){
                    this.disableAll()
                    this.scene.time.delayedCall(1000,()=>{
                        this.matchLogic(this.child1,this.child2)
                    })
                }

                
            })
            base.on('dragend',(pointer)=>{
                if(child.dragging){
                    
                    child.setActive(true)
                    this.dragoverLogic(pointer,child)
                    
                    if(child){
                        child.setActive(false); 
                        child.dragging = false; 
                        child.clicks = 2; 
                        child.copyPosition(child.org);
                    }
                    
                }
            })
            
        })

        
    }

    matchLogic(child1,child2){
        let sprite1 = child1.getAt(1)
        let sprite2 = child2.getAt(1)
        
        if(sprite1.texture.key === sprite2.texture.key){

            child1.destroy()
            child2.destroy()
            this.reset()           
        }
        
        else{
            child1.clicks = 2
            child2.clicks = 2
            sprite1.setVisible(false)
            sprite2.setVisible(false)
            this.reset()
            } 
            
            
            this.enableAll()
            
    }

    dragoverLogic(pointer,child){
        for (let i of this.getChildren()){
            if(!i.active){
                if(Math.abs(pointer.x - i.x ) <=50 && Math.abs(pointer.y - i.y) <=50 && i.getAt(1).texture.key === child.getAt(1).texture.key){
                    i.destroy()
                    child.destroy()
                    this.reset()
                    break
                }
            }
            
        }

    }

    disableAll(){
            this.children.iterate(child=>{
                child.disableInteractive()
            })
    }
    enableAll(){
            this.children.iterate(child=>{
                child.enableInteractive()
            })

    }
    reset(){

        this.child1 = null
        this.child2 = null
        this.bc1 = false
        this.bc2 = false

    }
        
    
    

}

export default GameManager