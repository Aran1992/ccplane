const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    private graphics: cc.Graphics = null;

    protected onLoad() {
        this.graphics = this.getComponent(cc.Graphics);

        this.graphics.circle(0, 0, 6);
        this.graphics.fillColor = cc.Color.YELLOW;
        this.graphics.fill();
        this.graphics.circle(0, 0, 5);
        this.graphics.fillColor = cc.Color.RED;
        this.graphics.fill();
    }
}
