import { _decorator, CCInteger, Component, Node } from 'cc';
import { GameCtr } from '../Game/GameCtr';
const { ccclass, property } = _decorator;

@ccclass('SquareGridCtr')
export class SquareGridCtr extends Component {
    @property(CCInteger)
    row : number;
    @property(CCInteger)
    col : number;
    @property(Node)
    listNextSquare : Node[] = [];
    start() {

    }

    update(deltaTime: number) {
        
    }
    SetInfor(r:number,c:number){
        this.row = r;
        this.col = c;
    }

    SetListNextSquare(){
        this.CheckNextNode(this.col-1,this.row);
        this.CheckNextNode(this.col,this.row+1);
        this.CheckNextNode(this.col+1,this.row);
        this.CheckNextNode(this.col,this.row-1);
    }
    CheckNextNode(c,r){
        if(c < 0 || r < 0) return;
        if(c > (GameCtr.instance.colNumber-1) || r > (GameCtr.instance.rowNumber-1)) return;
        this.listNextSquare.push(GameCtr.instance.grid.listSquareInGrid[c][r].node);
    }
}


