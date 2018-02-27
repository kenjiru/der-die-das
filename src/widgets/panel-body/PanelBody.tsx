import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {StyleRuleSetRecursive, ViewStyleRuleSet} from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

const styles = {
    bodyStyle: RX.Styles.createViewStyle({
        flexGrow: 2,
        flexDirection: "column",
        padding: constants.MEDIUM_SPACING
    }),
};

class PanelBody extends Component<IPanelBodyProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={[styles.bodyStyle, this.props.style]}>
                {this.props.children}
            </RX.View>
        );
    }
}

interface IPanelBodyProps {
    style?: StyleRuleSetRecursive<ViewStyleRuleSet>;
}

export default PanelBody;
