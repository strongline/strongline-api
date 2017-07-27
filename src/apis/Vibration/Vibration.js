import APIWrapper, { APIType } from "APIWrapper";
import { registerAPI } from "registration";

export default class VibrationAPI extends APIWrapper {
    constructor() {
        super("VibrationAPI", APIType.FUTURE);
    }

    static DURATION = {
        SHORT: 500,
        MEDIUM: 1000,
        LONG: 2500
    };

    static supported() {
        return !!("vibrate" in navigator);
    }

    vibrate(...args) {
        if (VibrationAPI.supported()) {
            navigator.vibrate(...args);
        }
    }
}

registerAPI({
    constructor: VibrationAPI,
    autoload: true
});
