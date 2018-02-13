import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { TextStyleRuleSet } from "reactxp/dist/common/Types";
import { IPracticeEntry } from "../../model/PracticeStore";
import { Gender, IWordEntry } from "../../model/WordStore";
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
    }),
    hitStyle: RX.Styles.createTextStyle({
        color: '#008000'
    }),
    missStyle: RX.Styles.createTextStyle({
        color: '#ee5555'
    })
};

class WordDetails extends Component<IWordDetailsProps> {
    private static ARTICLE_PLACE_HOLDER: ReactElement<RX.Text> = <RX.Text>●●●</RX.Text>;

    public render(): ReactElement<HTMLElement> {
        const {practiceEntry, wordEntry} = this.props;

        return (
            <RX.View style={styles.textContainer}>
                <RX.Text style={[styles.wordText, this.computeStyle()]}>
                    {this.renderArticle()} {practiceEntry.word}
                </RX.Text>

                <RX.Text style={styles.translationText}>
                    {wordEntry.translation}
                </RX.Text>

                <Feedback entry={practiceEntry}/>
            </RX.View>
        );
    }

    private renderArticle(): string | ReactElement<any> {
        const {selectedArticle, wordEntry} = this.props;

        if (_.isNil(selectedArticle)) {
            return WordDetails.ARTICLE_PLACE_HOLDER;
        }

        return wordEntry.gender;
    }

    private computeStyle(): TextStyleRuleSet {
        const {selectedArticle, wordEntry} = this.props;
        const isHit: boolean = wordEntry.gender === selectedArticle;

        if (_.isNil(selectedArticle)) {
            return {};
        }

        return isHit ? styles.hitStyle : styles.missStyle;
    }
}

interface IWordDetailsProps {
    practiceEntry: IPracticeEntry;
    wordEntry: IWordEntry;
    selectedArticle: Gender;
}

export default WordDetails;
