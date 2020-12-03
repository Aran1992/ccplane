export default class Utils {
    public static angle2radian(angle) {
        return angle / 180 * Math.PI;
    }

    public static radian2angle(radian) {
        return radian / Math.PI * 180;
    }
}