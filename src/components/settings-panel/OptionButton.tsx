import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import { StyleRuleSetRecursive, ViewStyleRuleSet } from "reactxp/src/common/Types";

const BORDER_RADIUS: number = 4;

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1
    }),
    button: RX.Styles.createTextStyle({
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0
    }),
    buttonSelected: RX.Styles.createViewStyle({
        backgroundColor: '#337ab7'
    }),
    firstButton: RX.Styles.createViewStyle({
        borderBottomLeftRadius: BORDER_RADIUS,
        borderTopLeftRadius: BORDER_RADIUS
    }),
    lastButton: RX.Styles.createViewStyle({
        borderBottomRightRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderRightWidth: 1
    }),
    label: RX.Styles.createTextStyle({
        color: '#337ab7'
    }),
    labelSelected: RX.Styles.createTextStyle({
        color: 'white',
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
