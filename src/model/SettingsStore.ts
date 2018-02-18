import { action, observable } from "mobx";
import Navigator from "reactxp-navigation";

export class SettingsStore {
    @observable
    public reactionSpeed: number = 2;

    public navigator: Navigator;

    @action
    public setReactionSpeed(speed: number): void {
        this.reactionSpeed = speed;
    }

    @action setNavigator(navigator: Navigator): void {
        this.navigator = navigator;
    }
}

const settingsStore: SettingsStore = new SettingsStore();

export default settingsStore;
