import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from 'reactxp';
import {IPracticeEntry} from "../../model/PracticeStore";
import constants from "../../util/StyleConstants";

const styles = {
    feedbackContainer: RX.Styles.createTextStyle({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: constants.SMALL_SPACING,
        marginBottom: constants.SMALL_SPACING
    }),
    resBox: RX.Styles.createTextStyle({
        width: constants.SMALL_ICON,
        height: constants.SMALL_ICON,
        margin: constants.TINY_SPACING
    }),
    emptyBox: RX.Styles.createTextStyle({
        backgroundColor: constants.LIGHT_GRAY
    }),
    hitBox: RX.Styles.createTextStyle({
        backgroundColor: constants.HIT_COLOR
    }),
    missBox: RX.Styles.createTextStyle({
        backgroundColor: constants.MISS_COLOR
    }),
    moreThankFiveText: RX.Styles.createTextStyle({
        fontSize: constants.MEDIUM_TEXT,
        fontWeight: "bold"
    })
};

class Feedback extends Component<IFeedbackProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.feedbackContainer}>
                {this.renderFeedback()}
            </RX.View>
        );
    }

    private renderFeedback(): ReactElement<any> | ReactElement<any>[] {
        const {hit, miss, consecutiveHit} = this.props.entry;

        if (hit + miss === 0) {
            return this.renderEmpty();
        }

        if (consecutiveHit > 5) {
            return this.renderMoreThanFive();
        }

        return this.renderLastFive();
    }

    private renderEmpty(): ReactElement<any> {
        return (
            <RX.View
                style={[styles.resBox, styles.emptyBox]}
            />
        );
    }

    private renderMoreThanFive(): ReactElement<any> {
        return (
            <RX.Text style={styles.moreThankFiveText}>
                x{this.props.entry.consecutiveHit}
            </RX.Text>
        )
    }

    private renderLastFive(): ReactElement<any>[] {
        return _.map(this.props.entry.lastFive,
            (isHit: boolean, index: number) =>
                <RX.View
                    key={index}
                    style={[styles.resBox, isHit ? styles.hitBox : styles.missBox]}
                />
        );
    }
}

interface IFeedbackProps {
    entry: IPracticeEntry;
}

export default Feedback;
