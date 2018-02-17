import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from "reactxp";
import { StyleRuleSetRecursive, ViewStyleRuleSet } from "reactxp/src/common/Types";

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16
    }),
    title: RX.Styles.createTextStyle({
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 4,
        color: 'black'
    }),
    content: RX.Styles.createTextStyle({
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
};

class Panel extends Component<IPanelProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={this.getStyle()}>
                {this.renderTitle()}
                <RX.View style={styles.content}>
                    {this.props.children}
                </RX.View>
            </RX.View>
        );
    }

    private renderTitle(): ReactElement<any> {
        if (_.isNil(this.props.title)) {
            return null;
        }

        return (
            <RX.Text style={styles.title}>
                {this.props.title}
            </RX.Text>
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