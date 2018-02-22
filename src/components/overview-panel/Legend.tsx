import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import constants from "../../util/StyleConstants";
import {overviewElementStyles, OverviewElementType} from "./OverviewPanel";

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: "row",
        alignItems: "flex-start"
    }),
    legendItem: RX.Styles.createViewStyle({
        marginRight: constants.SMALL_SPACING
    }),
    legendBox: RX.Styles.createViewStyle({
        width: constants.MEDIUM_ICON,
        height: constants.MEDIUM_ICON,
        marginRight: constants.SMALL_SPACING
    }),
    legendText: RX.Styles.createTextStyle({
        lineHeight: constants.MEDIUM_ICON,
        textAlignVertical: "center"
    })
};

class Legend extends Component<null> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.container}>
                {this.renderLegendItems()}
            </RX.View>
        );
    }

    private renderLegendItems(): ReactElement<any>[] {
        const legendItems: OverviewElementType[] =
            [OverviewElementType.Good, OverviewElementType.Known, OverviewElementType.Learning];

        return _.map(legendItems, (item: OverviewElementType, index: number) =>
            <RX.View key={index} style={[styles.container, styles.legendItem]}>
                <RX.View style={[styles.legendBox, overviewElementStyles[item]]}/>
                <RX.Text style={styles.legendText}>{item}</RX.Text>
            </RX.View>
        );
    }
}

export default Legend;
