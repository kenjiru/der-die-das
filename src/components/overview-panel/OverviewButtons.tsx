import { inject, observer } from "mobx-react/native";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { Types } from "reactxp-navigation";
import { NavigationRouteId } from "../../App";
import { SettingsStore } from "../../model/SettingsStore";
import constants from "../../util/StyleConstants";

const styles = {
    buttonContainer: RX.Styles.createViewStyle({
        flexGrow: 2,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    }),
    button: RX.Styles.createViewStyle({
        backgroundColor: constants.DIE_COLOR,
        padding: constants.SMALL_SPACING,
        borderRadius: constants.BORDER_RADIUS
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: constants.MEDIUM_TEXT,
        marginVertical: constants.SMALL_SPACING,
        marginHorizontal: constants.NORMAL_SPACING,
        color: constants.WHITE
    })
};

@inject("settingsStore")
@observer
class OverviewButtons extends Component<IOverviewButtonsProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.buttonContainer}>
                <RX.View>
                    <RX.Button
                        style={styles.button}
                        onPress={this.handleLearnPress}
                    >
                        <RX.Text style={styles.buttonText}>
                            Learn
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.View>
        );
    }

    private handleLearnPress = (): void => {
        this.props.settingsStore.navigator.push({
            routeId: NavigationRouteId.LearnPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        });
    }
}

interface IOverviewButtonsProps {
    settingsStore?: SettingsStore;
}

export default OverviewButtons;
