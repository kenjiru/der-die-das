import {inject, observer} from "mobx-react/native";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {SettingsStore} from "../../model/SettingsStore";
import constants from "../../util/StyleConstants";
import PanelBody from "../../widgets/panel-body/PanelBody";
import PanelTitle from "../../widgets/panel-title/PanelTitle";
import Panel from "../../widgets/panel/Panel";
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

                <PanelBody>
                    <RX.Text style={styles.title}>
                        Reaction Speed
                    </RX.Text>

                    <ReactionSpeed
                        value={this.props.settingsStore.reactionSpeed}
                        onChange={this.handleSpeedChange}
                    />
                </PanelBody>
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
