import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { IPracticeEntry } from "../../model/PracticeStore";
import { IWordEntry } from "../../model/WordStore";
import Feedback from "./Feedback";

const styles = {
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
    })
};

class WordDetails extends Component<IWordDetailsProps> {
    public render(): ReactElement<HTMLElement> {
        const {practiceEntry, wordEntry} = this.props;

        return (
            <RX.View style={styles.textContainer}>
                <RX.Text style={styles.wordText}>
                    ●●● {practiceEntry.word}
                </RX.Text>

                <RX.Text style={styles.translationText}>
                    {wordEntry.translation}
                </RX.Text>

                <Feedback entry={practiceEntry}/>
            </RX.View>
        );
    }
}

interface IWordDetailsProps {
    practiceEntry: IPracticeEntry;
    wordEntry: IWordEntry;
}

export default WordDetails;
