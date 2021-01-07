import MyComponent from "./MyComponent";

const {ccclass} = cc._decorator;

@ccclass
export default class Bullet extends MyComponent {
    private graphics: cc.Graphics = null;
    private velocity: number = 900;

    public setOrientation(angle: number) {
        const rigidBody = this.getComponent(cc.RigidBody);
        const x = Math.cos(angle) * this.velocity;
        const y = Math.sin(angle) * this.velocity;
        rigidBody.linearVelocity = cc.v2(x, y);
    }

    protected onLoad() {
        this.graphics = this.getComponent(cc.Graphics);

        this.graphics.circle(0, 0, 10);
        this.graphics.fillColor = cc.Color.WHITE;
        this.graphics.fill();
    }
}
