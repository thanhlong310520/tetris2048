import { _decorator, CCInteger, Component, instantiate, Node, Vec3 } from 'cc';
import { GridCtr } from '../Grid/GridCtr';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {
    static instance : GameCtr = null;
    protected onLoad(): void {
        GameCtr.instance = this;
    }

    @property(Node)
    point : Node;
    @property(Node)
    poinSqawns : Node;
    @property(CCInteger)
    rowNumber : number = 6;
    @property(CCInteger)
    colNumber : number = 5;

    @property(GridCtr)
    grid : GridCtr;
    

    listPointSpawn : Node[] = [];
    start() {
        this.SpawnPointSpawn();
    }

    update(deltaTime: number) {
        
    }
    SpawnPointSpawn(){
        for(let i = 0 ; i<this.colNumber;i++){
            let clonePoint = instantiate(this.point);
            clonePoint.setPosition(Vec3.ZERO);
            this.poinSqawns.addChild(clonePoint);
            this.listPointSpawn.push(clonePoint);
        }
    }
}


