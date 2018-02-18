import { inject, observer } from "mobx-react/native";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import { SettingsStore } from "../../model/SettingsStore";
import constants from "../../util/StyleConstants";
import Panel from "../../widgets/panel/Panel";
import PanelTitle from "../panel-title/PanelTitle";
import ReactionSpeed from "./ReactionSpeed";

const styles = {
    title: RX.Styles.createTextStyle({
        fontSize: constants.NORMAL_TEXT,
    })
};

@inject("settingsStore")
@observer
class SettingsPanel extends Component<ISettingsPanelProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <Panel>
                <PanelTitle title="Settings" hasSettings={false}/>

                <RX.Text style={styles.title}>
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

interface ISettingsPanelProps {
    settingsStore?: SettingsStore;
}

export default SettingsPanel;
