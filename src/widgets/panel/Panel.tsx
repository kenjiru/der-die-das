import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {StyleRuleSetRecursive, ViewStyleRuleSet} from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: constants.MEDIUM_SPACING
    })
};

class Panel extends Component<IPanelProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={this.getStyle()}>
                {this.props.children}
            </RX.View>
        );
    }

    private getStyle(): StyleRuleSetRecursive<ViewStyleRuleSet>[] {
        return [styles.container, this.props.style];
    }
}

interface IPanelProps {
    style?: StyleRuleSetRecursive<ViewStyleRuleSet>;
    title?: string;
}

export default Panel;
