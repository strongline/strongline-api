import APIWrapper, { APIType } from "APIWrapper";
import { registerAPI } from "registration";

const IBA_E = {
    CHARGING: "chargingchange",
    LEVEL: "levelchange",
    CHARGING_TIME: "chargingtimechange",
    DISCHARGING_TIME: "dischargingtimechange"
};

export default class BatteryAPI extends APIWrapper {
    level = -1;
    charging = false;
    chargingTime = -1;
    dischargingTime = -1;

    constructor() {
        super("BatteryAPI", APIType.FUTURE);

        if (BatteryAPI.supported()) {
            navigator.getBattery().then(battery => {
                const updateAllBatteryInfo = () => {
                    updateChargeInfo();
                    updateLevelInfo();
                    updateChargingInfo();
                    updateDischargingInfo();
                };

                const updateChargeInfo = () => (this.charging = !!battery.charging);
                const updateLevelInfo = () => (this.level = battery.level * 100);
                const updateChargingInfo = () => (this.chargingTime = battery.chargingTime);
                const updateDischargingInfo = () =>
                    (this.dischargingTime = battery.dischargingTime);

                updateAllBatteryInfo();

                battery.addEventListener(IBA_E.CHARGING, updateChargeInfo.bind(this));
                battery.addEventListener(IBA_E.LEVEL, updateLevelInfo.bind(this));
                battery.addEventListener(IBA_E.CHARGING_TIME, updateChargingInfo.bind(this));
                battery.addEventListener(IBA_E.DISCHARGING_TIME, updateDischargingInfo.bind(this));
            });
        }
    }

    static supported() {
        return !!("getBattery" in navigator);
    }
}

registerAPI({
    constructor: BatteryAPI,
    autoload: true
});
