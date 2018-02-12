import * as _ from "lodash";
import { inject, observer } from "mobx-react/native";
import { ReactElement } from "react";
import * as RX from 'reactxp';
import { PracticeStore } from "../../model/PracticeStore";
import { default as wordStore, Gender } from "../../model/WordStore";

interface LearnPanelProps {
    practiceStore?: PracticeStore;
    onNavigateBack: () => void;
}

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16
    }),

    textContainer: {
        marginBottom: 8
    },
    wordText: RX.Styles.createTextStyle({
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    }),
    translationText: RX.Styles.createTextStyle({
        fontSize: 16,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    }),

    feedbackContainer: RX.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8
    }),
    resBox: RX.Styles.createTextStyle({
        width: 16,
        height: 16,
        margin: 2
    }),
    hitBox: RX.Styles.createTextStyle({
        backgroundColor: '#008000'
    }),
    missBox: RX.Styles.createTextStyle({
        backgroundColor: '#ee5555'
    }),

    middleContainer: RX.Styles.createViewStyle({
        flex: 2
    }),

    buttonContainer: RX.Styles.createViewStyle({
        padding: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        borderRadius: 4,
        marginTop: 4,
        padding: 4,
        backgroundColor: '#7d88a9',
        alignItems: 'center'
    }),
    derButton: RX.Styles.createViewStyle({
        backgroundColor: '#337ab7'
    }),
    dieButton: RX.Styles.createViewStyle({
        backgroundColor: '#5cb85c'
    }),
    dasButton: RX.Styles.createViewStyle({
        backgroundColor: '#f0ad4e'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
};

@inject("practiceStore")
@observer
class LearnPanel extends RX.Component<LearnPanelProps> {
    constructor(props: LearnPanelProps) {
        super(props);

        const practiceStore: PracticeStore = this.props.practiceStore;
        practiceStore.getNextWord();
    }

    render() {
        const word: string = this.props.practiceStore.lastEntry.word;
        const translation: string = wordStore.findWord(word).translation;

        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.textContainer}>
                    <RX.Text style={styles.wordText}>
                        ●●● {word}
                    </RX.Text>

                    <RX.Text style={styles.translationText}>
                        {translation}
                    </RX.Text>

                    <RX.View style={styles.feedbackContainer}>
                        {this.renderLastFive()}
                    </RX.View>
                </RX.View>

                <RX.View style={styles.middleContainer}>
                </RX.View>

                <RX.View style={styles.buttonContainer}>
                    <RX.Button
                        style={[styles.roundButton, styles.derButton]}
                        onPress={() => this.handleArticle(Gender.Masculine)}
                    >
                        <RX.Text style={styles.buttonText}>
                            der
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[styles.roundButton, styles.dieButton]}
                        onPress={() => this.handleArticle(Gender.Feminine)}
                    >
                        <RX.Text style={styles.buttonText}>
                            die
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[styles.roundButton, styles.dasButton]}
                        onPress={() => this.handleArticle(Gender.Neuter)}
                    >
                        <RX.Text style={styles.buttonText}>
                            das
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.View>
        );
    }

    private renderLastFive(): ReactElement<any>[] {
        return _.map(this.props.practiceStore.lastEntry.lastFive,
            (isHit: boolean, index: number) =>
                <RX.View
                    key={index}
                    style={[styles.resBox, isHit ? styles.hitBox : styles.missBox]}
                />
        );
    }

    private handleArticle = (gender: Gender) => {
        const practiceStore: PracticeStore = this.props.practiceStore;

        practiceStore.updateLastPractice(gender);
        practiceStore.getNextWord();
    }

    private handleBack = () => {
        this.props.onNavigateBack();
    }
}

export default LearnPanel;
