const {ccclass} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
    private prefabBullet: cc.Prefab;

    protected onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        this.node.on('planeFire', this.onPlaneFire, this);
    }

    private onPlaneFire(position: cc.Vec2) {
        const bullet = cc.instantiate(this.prefabBullet);
        bullet.parent = this.node;
        bullet.setPosition(position);
    }
}
