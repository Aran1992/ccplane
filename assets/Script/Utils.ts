export default class Utils {
    public static angle2radian(angle: number): number {
        return angle / 180 * Math.PI;
    }

    public static radian2angle(radian: number): number {
        return radian / Math.PI * 180;
    }

    public static formatAngle(angle: number): number {
        if (angle >= 0) {
            return angle % 360;
        } else {
            return angle % 360 + 360;
        }
    }
}