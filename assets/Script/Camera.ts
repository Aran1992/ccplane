const {ccclass, property} = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
    @property(cc.Node)
    private plane: cc.Node;

    protected lateUpdate() {
        this.node.position = this.plane.position;
    }
}
