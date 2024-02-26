import { _decorator, Component, instantiate, Node, NodePool } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export class Spawner extends Component {
    Pool : NodePool;
    static instance : Spawner;
    protected onLoad(): void {
        Spawner.instance = this;
    }

    @property(Node)
    obj : Node;
    start() {
        this.Intialization();
    }

    update(deltaTime: number) {
        
    }
    Intialization(){
        this.Pool = new NodePool();
        

        for(let i = 0; i< 5; i++){
            let tempCake = instantiate(this.obj);
            this.Pool.put(tempCake);
        }
    }

    Spawning() : Node{
        let tempObj = null;
        if(this.Pool.size() > 0){
            tempObj = this.Pool.get();
        }
        else {
            // console.log("het");
            tempObj = instantiate(this.obj);
        }
        return tempObj;
    }

    Despawn(tempObj : Node){
        this.Pool.put(tempObj);
    }
}


