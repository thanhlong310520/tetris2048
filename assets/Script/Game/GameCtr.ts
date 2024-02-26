import { _decorator, CCInteger, Component, instantiate, Node, Vec3 } from 'cc';
import { GridCtr } from '../Grid/GridCtr';
import { HandleCurrentBlock } from './HandleCurrentBlock';
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
    listPointSpawn : Vec3[] = [];
    start() {
        this.SetDefault();
    }

    update(deltaTime: number) {
        
    }
    SetDefault(){
        this.currentPoint = 2;
    }
}


