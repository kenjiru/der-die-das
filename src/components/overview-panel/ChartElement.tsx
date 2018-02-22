import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {StyleRuleSetOrArray} from "reactxp/dist/common/Types";
import {StyleRuleSetRecursive, ViewStyleRuleSet} from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";
import {overviewElementStyles, OverviewElementType} from "./OverviewPanel";

const styles: StyleRuleSetOrArray<any> = {
    chartElement: RX.Styles.createViewStyle({
        paddingVertical: constants.SMALL_SPACING,
        alignItems: "center"
    }),
    chartText: RX.Styles.createTextStyle({
        color: constants.WHITE,
        fontSize: constants.NORMAL_TEXT
    }),
};

class ChartElement extends Component<IChartElementProps> {
    public render(): ReactElement<HTMLElement> {
        if (this.props.value === 0) {
            return <RX.View/>;
        }

        return (
            <RX.View style={[styles.chartElement, this.getStyle()]}>
                <RX.Text style={styles.chartText}>
                    {this.getValue()}
                </RX.Text>
            </RX.View>
        );
    }

    private getValue(): string {
        return _.toString(this.props.value);
    }

    private getStyle(): StyleRuleSetRecursive<ViewStyleRuleSet> {
        return [
            overviewElementStyles[this.props.type],
            {
                width: this.props.size
            }
        ];
    }
}

interface IChartElementProps {
    type: OverviewElementType;
    value?: number;
    size: number;
}

export default ChartElement;
