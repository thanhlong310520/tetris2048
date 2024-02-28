import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { NumberBlockCtr } from './NumberBlockCtr';
import { SquareGridCtr } from '../Grid/SquareGridCtr';
import { GameCtr } from '../Game/GameCtr';
const { ccclass, property } = _decorator;

@ccclass('BlockContact')
export class BlockContact extends Component {
    numberBlockCtr : NumberBlockCtr;
    start() {
        this.numberBlockCtr = this.node.parent.getComponent(NumberBlockCtr);
        this.numberBlockCtr.collider.on(Contact2DType.BEGIN_CONTACT,this.OnContact,this);
    }

    update(deltaTime: number) {
        
    }
    OnContact(selfCollider : Collider2D, otherCollider : Collider2D, contact : IPhysics2DContact){
        if(!this.numberBlockCtr.canChange) return;
        this.numberBlockCtr.row = otherCollider.getComponent(SquareGridCtr).row;
    }
}


