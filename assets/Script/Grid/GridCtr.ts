import { _decorator, CCInteger, Component, EventTouch, instantiate, Layout, Node, Prefab, Size, size, UITransform, Vec2, Vec3 } from 'cc';
import { SquareGridCtr } from './SquareGridCtr';
import { GameCtr } from '../Game/GameCtr';
const { ccclass, property } = _decorator;

@ccclass('GridCtr')
export class GridCtr extends Component {
    @property(Node)
    squareGridPrefab : Node;
    @property(Layout)
    layout : Layout;
    @property(UITransform)
    ui : UITransform;
    

    @property(CCInteger)
    rowNumber : number = 6;
    @property(CCInteger)
    colNumber : number = 5;

    listSquareInGrid : SquareGridCtr[][];
    start() {
        this.node.on(Node.EventType.TOUCH_START,this.Click,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.Click,this);
        this.node.on(Node.EventType.TOUCH_END,this.EndClick,this);
        this.rowNumber = GameCtr.instance.rowNumber;
        this.colNumber = GameCtr.instance.colNumber;
        this.listSquareInGrid = new Array(this.colNumber).fill(null).map(a => new Array(this.rowNumber).fill(null));
        this.getComponent(Layout).constraintNum = this.colNumber;
        this.InstantiateGrid();
        this.SetNext();


    }

    update(deltaTime: number) {
        
    }

    InstantiateGrid(){
        for(let i = 0 ; i < this.rowNumber; i++){
            for(let j = 0 ; j < this.colNumber ; j++){
                this.Sqawn(j,i);
            }
        }
        let childSize = this.squareGridPrefab.getComponent(UITransform).contentSize.x;
        this.ui.setContentSize(new Size(childSize*this.colNumber,this.ui.contentSize.y));
        this.scheduleOnce(()=>{
            for(let j = 0 ; j < this.colNumber ; j++){
                let v = new Vec3(this.listSquareInGrid[j][this.rowNumber-1].node.worldPosition.x,this.listSquareInGrid[j][this.rowNumber-1].node.worldPosition.y+childSize,1);
                GameCtr.instance.listPointSpawn.push(v);
            }
        },0.01)
    }
    Sqawn(col : number,row : number){
        let sp = instantiate(this.squareGridPrefab);
        sp.position = Vec3.ZERO;
        sp.setParent(this.node);
        let ctr = sp.getComponent(SquareGridCtr)
        ctr.SetInfor(row,col);
        this.listSquareInGrid[col][row] = ctr;
    }
    SetNext(){
        for(let i = 0 ; i < this.rowNumber; i++){
            for(let j = 0 ; j < this.colNumber ; j++){
                this.listSquareInGrid[j][i].SetListNextSquare();
            }
        }
    }

    Click(event : EventTouch){
        let pos = event.getUILocation();
        let dis = pos.x - this.node.worldPosition.x;
        let childSize = this.squareGridPrefab.getComponent(UITransform).contentSize.x;
        let index = Math.floor(dis/childSize);
        if(index > this.colNumber-1) index = this.colNumber-1;
        if(index < 0) index = 0;

        GameCtr.instance.handleCurrentBlock.ChangePosBlock(index);
    }
    EndClick(evnet : EventTouch){
        GameCtr.instance.handleCurrentBlock.EndChange();

    }
}


