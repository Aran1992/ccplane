const {ccclass, property} = cc._decorator;

@ccclass()
export default class Plane extends cc.Component {
    @property({type: cc.Float, displayName: '引擎推进力'})
    private engineForce: number = 0;
    @property({type: cc.Float, displayName: '旋转速度'})
    private angularVelocity: number = 0;
    @property({type: cc.Float, displayName: '空气阻力系数'})
    private airFrictionCoefficient: number = 0;
    private rigidBody: cc.RigidBody = null;
    private engineStarting = false;
    private turnLeft = false;
    private turnRight = false;
    private fire = false;

    protected onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected update() {
        if (this.turnLeft && this.turnRight) {
            this.rigidBody.angularVelocity = 0;
        } else if (this.turnLeft) {
            this.rigidBody.angularVelocity = -this.angularVelocity;
        } else if (this.turnRight) {
            this.rigidBody.angularVelocity = this.angularVelocity;
        } else {
            this.rigidBody.angularVelocity = 0;
        }

        if (this.engineStarting) {
            const angle = this.node.angle / 180 * Math.PI;
            const x = Math.cos(angle) * this.engineForce;
            const y = Math.sin(angle) * this.engineForce;
            const engineForce = new cc.Vec2(x, y);
            this.rigidBody.applyForceToCenter(engineForce, true);
        }

        const velocity = this.rigidBody.linearVelocity;
        const airFriction = new cc.Vec2(velocity.x * -this.airFrictionCoefficient, velocity.y * -this.airFrictionCoefficient);
        this.rigidBody.applyForceToCenter(airFriction, true);

        if (this.fire) {
            this.node.emit('planeFire', this.node.position);
        }
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
            case cc.macro.KEY.x: {
                this.fire = true;
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
            case cc.macro.KEY.x: {
                this.fire = false;
                break;
            }
        }
    }
}
