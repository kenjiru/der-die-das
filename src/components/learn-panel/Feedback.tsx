import * as _ from "lodash";
import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { IPracticeEntry } from "../../model/PracticeStore";

const styles = {
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
