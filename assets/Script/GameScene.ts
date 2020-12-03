import MyComponent from "./MyComponent";
import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends MyComponent {
    @property(cc.Prefab)
    private prefabBullet: cc.Prefab = null;

    protected onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        this.on('planeFire', this.onPlaneFire.bind(this));
    }

    private onPlaneFire(position: cc.Vec2, angle: number) {
        const nodeBullet = cc.instantiate(this.prefabBullet);
        nodeBullet.parent = this.node;
        nodeBullet.setPosition(position);
        const comBullet = nodeBullet.getComponent(Bullet);
        comBullet.setOrientation(angle);
    }
}
