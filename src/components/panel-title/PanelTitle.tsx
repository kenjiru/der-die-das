import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement, ReactNode } from "react";
import * as RX from "reactxp";
import constants from "../../util/StyleConstants";
import BackImage from "../../widgets/images/BackImage";
import SettingsImage from "../../widgets/images/SettingsImage";

const styles = {
    titleContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center'
    }),
    titleText: RX.Styles.createTextStyle({
        fontSize: constants.MEDIUM_TEXT,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: constants.SMALL_SPACING
    }),
    backButton: RX.Styles.createTextStyle({
        position: 'absolute',
        top: constants.SMALL_SPACING,
        left: constants.SMALL_SPACING
    }),
    settingsButton: RX.Styles.createTextStyle({
        position: 'absolute',
        top: constants.SMALL_SPACING,
        right: constants.SMALL_SPACING
    })
};

class PanelTitle extends Component<IPanelTitleProps> {
    public defaultProps: IPanelTitleProps = {
        hasBack: true,
        hasSettings: true
    };

    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.titleContainer}>
                {this.renderTitle()}
                {this.renderBackButton()}
                {this.renderSettingsButton()}
            </RX.View>
        );
    }

    private renderTitle(): ReactNode | string {
        if (_.isEmpty(this.props.children) === false) {
            return this.props.children;
        }

        return (
            <RX.Text style={styles.titleText}>
                {this.props.title}
            </RX.Text>
        )
    }

    private renderBackButton(): ReactElement<any> {
        if (this.props.hasBack === false) {
            return undefined;
        }

        return (
            <RX.Button
                style={styles.backButton}
                onPress={this.handleBack}
            >
                <BackImage/>
            </RX.Button>
        );
    }

    private renderSettingsButton(): ReactElement<any> {
        if (this.props.hasSettings === false) {
            return undefined;
        }

        return (
            <RX.Button
                style={styles.settingsButton}
                onPress={this.handleSettings}
            >
                <SettingsImage/>
            </RX.Button>
        );
    }

    private handleBack = () => {
    }

    private handleSettings = () => {
    }
}

interface IPanelTitleProps {
    title?: string;
    children?: ReactNode;
    hasBack?: boolean;
    hasSettings?: boolean;
}

export default PanelTitle;
