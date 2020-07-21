const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Node)
    plane: cc.Node = null;
    @property
    engineForce: number = 0;
    engineStarting = false;
    turnLeft = false;
    turnRight = false;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags =
            cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        const rigidBody = this.plane.getComponent(cc.RigidBody);
        const gravity = cc.director.getPhysicsManager().gravity;
        console.log("gravity", gravity);
        console.log("rigidBody.getMass()", rigidBody.getMass());
    }

    update() {
        const rigidBody = this.plane.getComponent(cc.RigidBody);
        const coe = 90;
        if (this.turnLeft) {
            rigidBody.angularVelocity = -coe;
        } else if (this.turnRight) {
            rigidBody.angularVelocity = coe;
        } else {
            rigidBody.angularVelocity = 0;
        }
        if (this.engineStarting) {
            const angle = this.plane.angle / 180 * Math.PI;
            const x = Math.cos(angle) * this.engineForce;
            const y = Math.sin(angle) * this.engineForce;
            rigidBody.linearVelocity = new cc.Vec2(x, y);
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up: {
                this.engineStarting = true;
                break;
            }
            case cc.macro.KEY.left: {
                this.turnLeft = true;
                break;
            }
            case cc.macro.KEY.right: {
                this.turnRight = true;
                break;
            }
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up: {
                this.engineStarting = false;
                break;
            }
            case cc.macro.KEY.left: {
                this.turnLeft = false;
                break;
            }
            case cc.macro.KEY.right: {
                this.turnRight = false;
                break;
            }
        }
    }
}
