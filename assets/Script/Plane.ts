const {ccclass, property} = cc._decorator;

@ccclass("飞机")
export default class Plane extends cc.Component {
    @property({type: cc.Float, displayName: "引擎推进力"})
    private engineForce: number;
    @property({type: cc.Float, displayName: "旋转速度"})
    private angularVelocity: number;
    @property({type: cc.Float, displayName: "空气阻力系数"})
    private airFrictionCoefficient: number;
    private engineStarting = false;
    private turnLeft = false;
    private turnRight = false;

    protected onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected start() {
        console.log("plane gravity", this.getComponent(cc.RigidBody).getMass() * cc.director.getPhysicsManager().gravity.y);
    }

    protected update() {
        const rigidBody = this.getComponent(cc.RigidBody);

        if (this.turnLeft && this.turnRight) {
            rigidBody.angularVelocity = 0;
        } else if (this.turnLeft) {
            rigidBody.angularVelocity = -this.angularVelocity;
        } else if (this.turnRight) {
            rigidBody.angularVelocity = this.angularVelocity;
        } else {
            rigidBody.angularVelocity = 0;
        }

        if (this.engineStarting) {
            const angle = this.node.angle / 180 * Math.PI;
            const x = Math.cos(angle) * this.engineForce;
            const y = Math.sin(angle) * this.engineForce;
            const engineForce = new cc.Vec2(x, y);
            rigidBody.applyForceToCenter(engineForce, true);
        }

        const velocity = rigidBody.linearVelocity;
        const airFriction = new cc.Vec2(velocity.x * -this.airFrictionCoefficient, velocity.y * -this.airFrictionCoefficient);
        rigidBody.applyForceToCenter(airFriction, true);
    }

    private onKeyDown(event) {
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

    private onKeyUp(event) {
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
