import { _decorator, CCInteger, Component, instantiate, Node, Vec3 } from 'cc';
import { GridCtr } from '../Grid/GridCtr';
import { HandleCurrentBlock } from './HandleCurrentBlock';
import { NumberBlockCtr } from '../Obj/NumberBlockCtr';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {
    static instance : GameCtr = null;
    protected onLoad(): void {
        GameCtr.instance = this;
    }

    @property(GridCtr)
    grid : GridCtr;
    @property(HandleCurrentBlock)
    handleCurrentBlock : HandleCurrentBlock;
    @property(CCInteger)
    rowNumber : number = 6;
    @property(CCInteger)
    colNumber : number = 5;

    
    currentPoint : number;

    isPause : boolean;
    listPointSpawn : Vec3[] = [];
    start() {
        this.SetDefault();
    }

    update(deltaTime: number) {
        
    }

    CheckCanMerge(blockCtr : NumberBlockCtr){
        let isMerge : boolean = false;
        this.grid.listSquareInGrid[blockCtr.col][blockCtr.row];
    }
    CheckGameOver(){
        this.handleCurrentBlock.currentBlock = null;
    }
    SetDefault(){
        this.isPause = true;
        this.currentPoint = 2;
    }
}


