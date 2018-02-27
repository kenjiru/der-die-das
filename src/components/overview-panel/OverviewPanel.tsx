import {inject, observer} from "mobx-react/native";
import {ReactElement} from "react";
import * as RX from 'reactxp';
import {PracticeStore} from "../../model/PracticeStore";
import {WordStore} from "../../model/WordStore";
import constants from "../../util/StyleConstants";
import PanelBody from "../../widgets/panel-body/PanelBody";
import PanelTitle from "../../widgets/panel-title/PanelTitle";
import Panel from "../../widgets/panel/Panel";
import Chart from "./Chart";
import Legend from "./Legend";
import OverviewButtons from "./OverviewButtons";
import Summary from "./Summary";

export enum OverviewElementType {
    Good = "Good",
    Known = "Known",
    Learning = "Learning"
}

export const overviewElementStyles = {
    [OverviewElementType.Good]: RX.Styles.createViewStyle({
        backgroundColor: constants.DER_COLOR
    }),
    [OverviewElementType.Known]: RX.Styles.createViewStyle({
        backgroundColor: constants.DIE_COLOR
    }),
    [OverviewElementType.Learning]: RX.Styles.createViewStyle({
        backgroundColor: constants.DAS_COLOR
    }),
};

@inject("practiceStore")
@inject("wordStore")
@observer
class OverviewPanel extends RX.Component<MainPanelProps> {
    private static APP_TITLE: string = "Der Die Das";

    public render(): ReactElement<any> {
        const total: number = this.getTotal();
        const good: number = this.getGood();
        const known: number = this.getKnown();

        return (
            <Panel>
                <PanelTitle
                    title={OverviewPanel.APP_TITLE}
                    hasBack={false}
                />

                <PanelBody>
                    <Summary learned={good + known} total={total}/>
                    <Chart
                        total={total}
                        good={good}
                        known={known}
                        learning={this.getLearning()}
                    />
                    <Legend/>
                    <OverviewButtons/>
                </PanelBody>
            </Panel>
        );
    }

    private getTotal(): number {
        return this.props.wordStore.words.length;
    }

    private getGood(): number {
        return this.props.practiceStore.goodWords.length;
    }

    private getKnown(): number {
        return this.props.practiceStore.knownWords.length;
    }

    private getLearning(): number {
        return this.props.practiceStore.currentEntries.length;
    }
}

interface MainPanelProps {
    practiceStore?: PracticeStore;
    wordStore?: WordStore;
}

export default OverviewPanel;
