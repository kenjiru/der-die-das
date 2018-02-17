import * as _ from "lodash";
import { inject, observer } from "mobx-react/native";
import * as RX from 'reactxp';
import { IPracticeEntry, PracticeStore } from "../../model/PracticeStore";
import { default as wordStore, Gender, IWordEntry } from "../../model/WordStore";
import Panel from "../../widgets/panel/Panel";
import ArticleButtons from "./ArticleButtons";
import WordDetails from "./WordDetails";

const styles = {
    middleContainer: RX.Styles.createViewStyle({
        flex: 2
    })
};

@inject("practiceStore")
@observer
class LearnPanel extends RX.Component<ILearnPanelProps, ILearnPanelState> {
    private static DISPLAY_DELAY: number = 1000;

    constructor(props: ILearnPanelProps) {
        super(props);

        const practiceStore: PracticeStore = this.props.practiceStore;
        practiceStore.getNextWord();

        this.state = {};
    }

    render() {
        const lastEntry: IPracticeEntry = this.props.practiceStore.lastEntry;
        const wordEntry: IWordEntry = wordStore.findWord(lastEntry.word);

        return (
            <Panel>
                <WordDetails
                    practiceEntry={lastEntry}
                    wordEntry={wordEntry}
                    selectedArticle={this.state.selectedArticle}
                />

                <RX.View style={styles.middleContainer}>
                </RX.View>

                <ArticleButtons onArticle={this.handleArticle}/>
            </Panel>
        );
    }

    private handleArticle = (gender: Gender) => {
        if (_.isNil(this.state.selectedArticle) === false) {
            return;
        }

        const {practiceStore} = this.props;

        practiceStore.updateLastPractice(gender);

        this.setState({
            selectedArticle: gender
        });

        setTimeout(this.getNextWord, LearnPanel.DISPLAY_DELAY);
    }

    private getNextWord = () => {
        const {practiceStore} = this.props;

        practiceStore.getNextWord();

        this.setState({
            selectedArticle: null
        });
    }
}

interface ILearnPanelProps {
    practiceStore?: PracticeStore;
    onNavigateBack?: () => void;
}

interface ILearnPanelState {
    selectedArticle?: Gender;
}

export default LearnPanel;
