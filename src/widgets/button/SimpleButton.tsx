import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {TextStyleRuleSet} from "reactxp/dist/common/Types";
import {StyleRuleSetRecursive, ViewStyleRuleSet} from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

const styles = {
    button: RX.Styles.createViewStyle({
        backgroundColor: constants.DIE_COLOR,
        padding: constants.SMALL_SPACING,
        borderRadius: constants.BORDER_RADIUS
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: constants.NORMAL_TEXT,
        marginVertical: constants.SMALL_SPACING,
        marginHorizontal: constants.NORMAL_SPACING,
        color: constants.WHITE
    })
};

class SimpleButton extends Component<ISimpleButtonProps> {
    public render(): ReactElement<HTMLElement> {
        const {style, textStyle} = this.props;

        return (
            <RX.Button
                style={[styles.button, style]}
                onPress={this.props.onPress}
            >
                <RX.Text style={[styles.buttonText, textStyle]}>
                    {this.props.children}
                </RX.Text>
            </RX.Button>
        );
    }
}

interface ISimpleButtonProps {
    onPress: () => void;
    style?: StyleRuleSetRecursive<ViewStyleRuleSet>;
    textStyle?: StyleRuleSetRecursive<TextStyleRuleSet>;
}

export default SimpleButton;
