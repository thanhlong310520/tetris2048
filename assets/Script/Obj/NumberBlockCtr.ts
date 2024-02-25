import { _decorator, CCInteger, Collider, Collider2D, Component, Node, RigidBody2D } from 'cc';
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

    start() {

    }

    update(deltaTime: number) {
        
    }
}


