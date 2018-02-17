import { inject, observer } from "mobx-react/native";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import { SettingsStore } from "../../model/SettingsStore";
import Panel from "../../widgets/panel/Panel";
import ReactionSpeed from "./ReactionSpeed";

@inject("settingsStore")
@observer
class SettingsPanel extends Component<ISettingsPanelProps, ISettingsPanelState> {
    public render(): ReactElement<HTMLElement> {
        return (
            <Panel title="Settings">
                <RX.Text>
                    Reaction Speed
                </RX.Text>

                <ReactionSpeed
                    value={this.props.settingsStore.reactionSpeed}
                    onChange={this.handleSpeedChange}
                />
            </Panel>
        );
    }

    private handleSpeedChange = (speed: number): void => {
        this.props.settingsStore.setReactionSpeed(speed);
    }
}

interface ISettingsPanelState {
}

interface ISettingsPanelProps {
    settingsStore?: SettingsStore;
}

export default SettingsPanel;
