import { _decorator, CCFloat, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
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
    opacity : number = 100;

    isPause : boolean;
    
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
        this.currentBlock.node.setWorldPosition(GameCtr.instance.listPointSpawn[GameCtr.instance.currentPoint]);
        this.currentBlock.SetVelocity(this.normalSpeed);
        if(this.isPause) this.PauseBlock();
    }
    OnClick(event : EventKeyboard){
        if(event.keyCode == KeyCode.SPACE){
            this.Spawning(1);
        }
        if(event.keyCode == KeyCode.KEY_P){
            this.PauseBlock();
        }
    }

    ChangePosBlock(index : number){
        if(this.currentBlock == null) return;
        if(!this.currentBlock.canChange) return;
        if(!this.CheckCanChange(index)) return;

        GameCtr.instance.currentPoint = index;
        let pos = GameCtr.instance.listPointSpawn[index];
        this.currentBlock.col = index;
        this.currentBlock.ChangePos(pos.x);
        this.currentBlock.squareDone = this.GetSquareDone(index);
    }
    EndChange(){
        if(this.currentBlock == null) return;
        this.currentBlock.SetDone();
    }

    GetSquareDone(index :number) : SquareGridCtr{
        for(let i = 0 ; i<GameCtr.instance.rowNumber ; i++){
            if(GameCtr.instance.grid.listSquareInGrid[index][i].numberBlockCtr == null) return GameCtr.instance.grid.listSquareInGrid[index][i];
        }
        return null;
    }

    CheckCanChange(index : number) : boolean{
        let max = -1;
        let min = -1;
        if(index > (this.currentBlock.col)){
            min = this.currentBlock.col+1;
            max = index;
        }
        else if(index < this.currentBlock.col){
            min = index;
            max = this.currentBlock.col-1;
        }
        else return true;
        for(let i = min ; i<= max ;i++){
            if(GameCtr.instance.grid.listSquareInGrid[i][this.currentBlock.row].numberBlockCtr != null){
                return false;
            }
        }

        return true;
    }
    

    PauseBlock(){
        this.isPause = true;
        if(this.currentBlock == null) return;
        this.currentBlock.SetVelocity(0);
        this.currentBlock.canChange = false;
        this.currentBlock.uiOpacity.opacity = this.opacity;
    }

    SetDefault(){
        if(this.currentBlock != null) this.currentBlock.node.destroy();
        this.currentBlock = null;
        this.isPause = false;

    }
}


