import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { TextStyleRuleSet } from "reactxp/dist/common/Types";
import { IPracticeEntry } from "../../model/PracticeStore";
import { Gender, IWordEntry } from "../../model/WordStore";
import constants from "../../util/StyleConstants";
import Feedback from "./Feedback";

const styles = {
    textContainer: RX.Styles.createViewStyle({
        marginBottom: constants.NORMAL_SPACING
    }),
    wordText: RX.Styles.createTextStyle({
        fontSize: constants.BIG_TEXT,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: constants.MEDIUM_SPACING
    }),
    translationText: RX.Styles.createTextStyle({
        fontSize: constants.MEDIUM_TEXT,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: constants.MEDIUM_SPACING
    }),
    hitStyle: RX.Styles.createTextStyle({
        color: constants.HIT_COLOR
    }),
    missStyle: RX.Styles.createTextStyle({
        color: constants.MISS_COLOR
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
