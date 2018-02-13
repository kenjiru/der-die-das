import { inject, observer } from "mobx-react/native";
import * as RX from 'reactxp';
import { IPracticeEntry, PracticeStore } from "../../model/PracticeStore";
import { default as wordStore, Gender, IWordEntry } from "../../model/WordStore";
import ArticleButtons from "./ArticleButtons";
import WordDetails from "./WordDetails";

interface ILearnPanelProps {
    practiceStore?: PracticeStore;
    onNavigateBack?: () => void;
}

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16
    }),

    middleContainer: RX.Styles.createViewStyle({
        flex: 2
    })
};

@inject("practiceStore")
@observer
class LearnPanel extends RX.Component<ILearnPanelProps> {
    constructor(props: ILearnPanelProps) {
        super(props);

        const practiceStore: PracticeStore = this.props.practiceStore;
        practiceStore.getNextWord();
    }

    render() {
        const lastEntry: IPracticeEntry = this.props.practiceStore.lastEntry;
        const wordEntry: IWordEntry = wordStore.findWord(lastEntry.word);

        return (
            <RX.View style={styles.container}>
                <WordDetails
                    practiceEntry={lastEntry}
                    wordEntry={wordEntry}
                />

                <RX.View style={styles.middleContainer}>
                </RX.View>

                <ArticleButtons onArticle={this.handleArticle}/>
            </RX.View>
        );
    }

    private handleArticle = (gender: Gender) => {
        const practiceStore: PracticeStore = this.props.practiceStore;

        practiceStore.updateLastPractice(gender);
        practiceStore.getNextWord();
    }
}

export default LearnPanel;
