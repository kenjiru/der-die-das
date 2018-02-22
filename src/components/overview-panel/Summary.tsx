import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import style from "../../util/StyleConstants";

const styles = {
    container: RX.Styles.createViewStyle({
        marginBottom: style.NORMAL_SPACING
    }),
    text: RX.Styles.createTextStyle({
        fontSize: style.NORMAL_TEXT
    })
};

class Summary extends Component<ISummaryProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.container}>
                <RX.Text style={styles.text}>
                    You learned {this.props.learned} of {this.props.total} words.
                </RX.Text>
            </RX.View>
        );
    }
}

interface ISummaryProps {
    learned: number;
    total: number;
}

export default Summary;
