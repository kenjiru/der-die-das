import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import { StyleRuleSetRecursive, ViewStyleRuleSet } from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1
    }),
    button: RX.Styles.createTextStyle({
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: constants.WHITE,
        borderColor: constants.LIGHT_GRAY,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0
    }),
    buttonSelected: RX.Styles.createViewStyle({
        backgroundColor: constants.LIGHT_BLUE
    }),
    firstButton: RX.Styles.createViewStyle({
        borderBottomLeftRadius: constants.BORDER_RADIUS,
        borderTopLeftRadius: constants.BORDER_RADIUS
    }),
    lastButton: RX.Styles.createViewStyle({
        borderBottomRightRadius: constants.BORDER_RADIUS,
        borderTopRightRadius: constants.BORDER_RADIUS,
        borderWidth: 1,
        borderRightWidth: 1
    }),
    label: RX.Styles.createTextStyle({
        color: constants.LIGHT_BLUE
    }),
    labelSelected: RX.Styles.createTextStyle({
        color: constants.WHITE
    })
};

class OptionButton extends Component<IOptionButtonProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.Button
                style={this.getButtonStyle()}
                onPress={this.props.onPress}
            >
                <RX.Text style={this.getLabelStyle()}>
                    {this.props.label}
                </RX.Text>
            </RX.Button>
        );
    }

    private getButtonStyle(): StyleRuleSetRecursive<ViewStyleRuleSet>[] {
        return [
            styles.button,
            this.props.isSelected ? styles.buttonSelected : undefined,
            this.props.isFirst ? styles.firstButton : undefined,
            this.props.isLast ? styles.lastButton : undefined
        ];
    }

    private getLabelStyle(): StyleRuleSetRecursive<ViewStyleRuleSet>[] {
        return [styles.label, this.props.isSelected ? styles.labelSelected : undefined];
    }
}

interface IOptionButtonProps {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export default OptionButton;
