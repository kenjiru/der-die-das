import { action, observable } from "mobx";

export class SettingsStore {
    @observable
    public reactionSpeed: number = 2;

    @action
    public setReactionSpeed(speed: number): void {
        this.reactionSpeed = speed;
    }
}

const settingsStore: SettingsStore = new SettingsStore();

export default settingsStore;
