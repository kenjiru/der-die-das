import {inject, observer} from "mobx-react/native";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from 'reactxp';
import {Types} from "reactxp-navigation";
import {NavigationRouteId} from "../../App";
import {SettingsStore} from "../../model/SettingsStore";
import SimpleButton from "../../widgets/button/SimpleButton";

const styles = {
    buttonContainer: RX.Styles.createViewStyle({
        flexGrow: 2,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    }),
};

@inject("settingsStore")
@observer
class NavigationButtons extends Component<IOverviewButtonsProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.buttonContainer}>
                <SimpleButton onPress={this.handleWordsPress}>
                    Words
                </SimpleButton>
                <SimpleButton onPress={this.handleLearnPress}>
                    Learn
                </SimpleButton>
            </RX.View>
        );
    }

    private handleWordsPress = (): void => {
        this.navigateTo(NavigationRouteId.WordsPanel);
    }

    private handleLearnPress = (): void => {
        this.navigateTo(NavigationRouteId.LearnPanel);
    }

    private navigateTo(routeId: NavigationRouteId): void {
        this.props.settingsStore.navigator.push({
            routeId,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        });
    }
}

interface IOverviewButtonsProps {
    settingsStore?: SettingsStore;
}

export default NavigationButtons;
