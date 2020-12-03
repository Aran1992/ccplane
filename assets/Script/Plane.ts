import MyComponent from "./MyComponent";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Plane extends MyComponent {
    @property({type: cc.Float, displayName: '引擎推进力'})
    private engineForce: number = 0;
    @property({type: cc.Float, displayName: '旋转速度'})
    private angularVelocity: number = 0;
    @property({type: cc.Float, displayName: '空气阻力系数'})
    private airFrictionCoefficient: number = 0;
    private rigidBody: cc.RigidBody = null;
    private audioSource: cc.AudioSource = null;
    private engineStarting = false;
    private turnLeft = false;
    private turnRight = false;
    private fire = false;
    private lastFireTime = 0;
    private fireInterval = 1000 / 30 * 4;

    protected onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.audioSource = this.getComponent(cc.AudioSource);
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
            const radian = Utils.angle2radian(this.node.angle);
            const x = Math.cos(radian) * this.engineForce;
            const y = Math.sin(radian) * this.engineForce;
            const engineForce = new cc.Vec2(x, y);
            this.rigidBody.applyForceToCenter(engineForce, true);
        }

        const velocity = this.rigidBody.linearVelocity;
        const airFriction = new cc.Vec2(velocity.x * -this.airFrictionCoefficient, velocity.y * -this.airFrictionCoefficient);
        this.rigidBody.applyForceToCenter(airFriction, true);

        if (this.fire) {
            const now = new Date().getTime();
            const interval = now - this.lastFireTime;
            if (interval > this.fireInterval) {
                this.emit('planeFire', this.node.position, Utils.angle2radian(this.node.angle));
                this.audioSource.play();
                this.lastFireTime = now;
            }
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
