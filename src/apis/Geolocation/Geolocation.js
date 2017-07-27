import APIWrapper, { APIType } from "APIWrapper";
import { registerAPI } from "registration";

export default class GeolocationAPI extends APIWrapper {
    position = null;
    coords = {};

    constructor() {
        super("GeolocationAPI", APIType.FUTURE);
    }

    static supported() {
        return !!("geolocation" in navigator);
    }

    $$getLocation(callback = () => {}) {
        return navigator.geolocation.getCurrentPosition(position => {
            this.coords = position.coords;
            this.position = position;
        });
    }

    fetch(callback) {
        this.$$getLocation(callback);
    }
}

registerAPI({
    constructor: GeolocationAPI,
    autoload: true
});
