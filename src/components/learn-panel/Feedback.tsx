import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { IPracticeEntry } from "../../model/PracticeStore";
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
    hitBox: RX.Styles.createTextStyle({
        backgroundColor: constants.HIT_COLOR
    }),
    missBox: RX.Styles.createTextStyle({
        backgroundColor: constants.MISS_COLOR
    })
};

class Feedback extends Component<IFeedbackProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.feedbackContainer}>
                {this.renderLastFive()}
            </RX.View>
        );
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
