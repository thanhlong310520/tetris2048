import { _decorator, CCInteger, Collider, Collider2D, Component, Node, RigidBody2D, tween, UITransform, Vec2, Vec3 } from 'cc';
import { SquareGridCtr } from '../Grid/SquareGridCtr';
const { ccclass, property } = _decorator;

@ccclass('NumberBlockCtr')
export class NumberBlockCtr extends Component {
    @property(RigidBody2D)
    rig : RigidBody2D;

    @property(Collider2D)
    collider : Collider2D;
    
    @property(CCInteger)
    id : number;

    col : number;
    row : number;

    squareDone : SquareGridCtr;

    canChange : boolean;
    isMove : boolean;

    start() {

    }

    update(deltaTime: number) {
        if(this.isMove){
            if(this.squareDone == null) return;
            if(this.node.worldPosition.y < this.squareDone.node.worldPosition.y+this.node.getComponent(UITransform).contentSize.x/2){
                this.SetDone();
                this.isMove = false;
                this.canChange = false;
            }
        }
    }

    SetInfor(){
        
    }

    SetVelocity(v : number){
        if(!this.isMove) return;
        this.rig.linearVelocity = new Vec2(0,-v);
    }

    ChangePos(wouldPosx : number){
        this.node.worldPosition = new Vec3(wouldPosx,this.node.worldPosition.y,1);
        
    }
    SetDefault(){
        this.canChange = true;
        this.isMove = true;
    }
    SetDone(){
        this.SetVelocity(0);
        tween(this.node).to(0.2,{worldPosition : this.squareDone.node.worldPosition}).call(()=>{
            //Check An
            this.squareDone.numberBlockCtr = this;
        }).start();
    }
}


