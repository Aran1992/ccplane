import MyComponent from "./MyComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Camera extends MyComponent {
    @property(cc.Node)
    private plane: cc.Node = null;
    @property({type: cc.Float, displayName: '屏幕震动最小值'})
    private screenShakeMin: number = 0;
    @property({type: cc.Float, displayName: '屏幕震动最大值'})
    private screenShakeMax: number = 0;
    @property({type: cc.Float, displayName: 'X轴偏移'})
    private xOffset: number = 0;
    @property({type: cc.Float, displayName: 'Y轴偏移'})
    private yOffset: number = 0;

    protected lateUpdate() {
        const planeMoveAngle = this.plane.angle / 180 * Math.PI;
        const x = Math.cos(planeMoveAngle);
        const y = Math.sin(planeMoveAngle);
        let xOffset = 0;
        if (x < 0) {
            xOffset = -this.xOffset;
        } else if (x > 0) {
            xOffset = this.xOffset;
        }
        let yOffset = 0;
        if (y < 0) {
            yOffset = -this.yOffset;
        } else if (y > 0) {
            yOffset = this.yOffset;
        }
        const targetX = this.plane.position.x + xOffset;
        const targetY = this.plane.position.y + yOffset;
        const diffX = targetX - this.node.position.x;
        const diffY = targetY - this.node.position.y;
        let cameraMoveAngle = Math.atan(diffY / diffX);
        if (diffX < 0) {
            if (diffY < 0) {
                cameraMoveAngle += Math.PI;
            } else if (diffY > 0) {
                cameraMoveAngle += Math.PI;
            } else {
                cameraMoveAngle = Math.PI;
            }
        } else if (diffX > 0) {
            if (diffY < 0) {
            } else if (diffY > 0) {
            } else {
                cameraMoveAngle = 0;
            }
        } else {
            if (diffY < 0) {
                cameraMoveAngle = Math.PI / 2 * 3;
            } else if (diffY > 0) {
                cameraMoveAngle = Math.PI / 2;
            } else {
                cameraMoveAngle = 0;
            }
        }
        // 跟不上飞机的速度
        const velocity = 20;
        const addX = Math.cos(cameraMoveAngle) * velocity;
        const addY = Math.sin(cameraMoveAngle) * velocity;
        const newX = Camera.approach(this.node.position.x, addX, targetX);
        const newY = Camera.approach(this.node.position.y, addY, targetY);
        this.node.position = this.plane.position;
        // todo 速度太快跟不上

        // const x = this.node.position.x + this.screenShakeMin + (this.screenShakeMax - this.screenShakeMin) * Math.random();
        // const y = this.node.position.y + this.screenShakeMin + (this.screenShakeMax - this.screenShakeMin) * Math.random();
        // this.node.position = cc.v3(x, y, this.node.position.z);
    }

    private static approach(curValue, addValue, targetValue) {
        let newValue = curValue + addValue;
        if (addValue > 0) {
            if (newValue > targetValue) {
                newValue = targetValue;
            }
        } else if (addValue < 0) {
            if (newValue < targetValue) {
                newValue = targetValue;
            }
        }
        return newValue;
    }
}
