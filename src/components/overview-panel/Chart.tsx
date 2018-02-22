import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {ViewOnLayoutEvent} from "reactxp/src/common/Types";
import constants from "../../util/StyleConstants";
import ChartElement from "./ChartElement";
import {OverviewElementType} from "./OverviewPanel";

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: "row",
        alignItems: "flex-start"
    }),
    chartContainer: RX.Styles.createViewStyle({
        backgroundColor: constants.LIGHT_GRAY,
        marginBottom: 1
    })
};

class Chart extends Component<IChartProps, IChartState> {
    constructor(props: IChartProps) {
        super(props);

        this.state = {
            width: 0
        };
    }

    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View
                style={[styles.container, styles.chartContainer]}
                onLayout={this.handleLayout}
            >
                {this.renderChartElements()}
            </RX.View>
        );
    }

    private renderChartElements(): ReactElement<any>[] {
        if (this.state.width === 0) {
            return undefined;
        }

        return _.map(this.getChartElements(), (chartElement: IChartElement, index: number) =>
            <ChartElement
                key={index}
                {...chartElement}
            />
        );
    }

    private getChartElements(): IChartElement[] {
        const {total, good, known, learning} = this.props;
        const {width} = this.state;

        return [{
            type: OverviewElementType.Good,
            value: good,
            size: width * good / total
        }, {
            type: OverviewElementType.Known,
            value: known,
            size: width * known / total
        }, {
            type: OverviewElementType.Learning,
            value: learning,
            size: width * learning / total
        }];
    }

    private handleLayout = (layout: ViewOnLayoutEvent) => {
        this.setState({
            width: layout.width
        });
    }
}

interface IChartElement {
    type: OverviewElementType,
    value?: number,
    size: number
}

interface IChartState {
    width: number;
}

interface IChartProps {
    total: number;
    good: number;
    known: number;
    learning: number;
}

export default Chart;
