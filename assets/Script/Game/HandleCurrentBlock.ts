import { _decorator, CCFloat, Component, EventKeyboard, Input, input, Node } from 'cc';
import { NumberBlockCtr } from '../Obj/NumberBlockCtr';
import { Spawner } from './Spawner';
import { GameCtr } from './GameCtr';
import { SquareGridCtr } from '../Grid/SquareGridCtr';
const { ccclass, property } = _decorator;

@ccclass('HandleCurrentBlock')
export class HandleCurrentBlock extends Component {

    @property(NumberBlockCtr)
    currentBlock : NumberBlockCtr;

    @property(CCFloat)
    normalSpeed : number = 2;
    @property(CCFloat)
    tuboSpeed : number = 10;
    
    start() {
        input.on(Input.EventType.KEY_DOWN,this.OnClick,this)
    }

    update(deltaTime: number) {
        
    }

    Spawning(index : number){
        let tempnode = Spawner.instance.Spawning();
        this.currentBlock = tempnode.getComponent(NumberBlockCtr);
        this.currentBlock.node.setParent(this.node);
        this.currentBlock.SetDefault();
        this.ChangePosBlock(GameCtr.instance.currentPoint);
        this.currentBlock.SetVelocity(this.normalSpeed);
    }
    OnClick(event : EventKeyboard){
        this.Spawning(1);
    }

    ChangePosBlock(index : number){
        //check can change
        if(!this.currentBlock.canChange) return;
        let pos = GameCtr.instance.listPointSpawn[index];
        this.currentBlock.ChangePos(pos.x);
        this.currentBlock.squareDone = this.GetSquareDone(index);
    }
    EndChange(){
        this.currentBlock.SetVelocity(this.tuboSpeed);
    }

    GetSquareDone(index :number) : SquareGridCtr{
        for(let i = 0 ; i<GameCtr.instance.rowNumber ; i++){
            if(GameCtr.instance.grid.listSquareInGrid[index][i].numberBlockCtr == null) return GameCtr.instance.grid.listSquareInGrid[index][i];
        }
        return null;
    }
}


