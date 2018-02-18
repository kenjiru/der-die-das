import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { Gender } from "../../model/WordStore";
import constants from "../../util/StyleConstants";

const styles = {
    buttonContainer: RX.Styles.createViewStyle({
        padding: constants.MEDIUM_SPACING
    }),
    roundedButton: RX.Styles.createViewStyle({
        borderRadius: constants.BORDER_RADIUS,
        marginTop: constants.SMALL_SPACING,
        padding: constants.SMALL_SPACING,
        backgroundColor: constants.LIGHT_GRAY,
        alignItems: 'center'
    }),
    derButton: RX.Styles.createViewStyle({
        backgroundColor: constants.DER_COLOR
    }),
    dieButton: RX.Styles.createViewStyle({
        backgroundColor: constants.DIE_COLOR
    }),
    dasButton: RX.Styles.createViewStyle({
        backgroundColor: constants.DAS_COLOR
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: constants.MEDIUM_TEXT,
        marginVertical: constants.SMALL_SPACING,
        marginHorizontal: constants.NORMAL_SPACING,
        color: constants.WHITE
    })
};

class ArticleButtons extends Component<IArticleButtonsProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.buttonContainer}>
                <RX.Button
                    style={[styles.roundedButton, styles.derButton]}
                    onPress={() => this.handleArticle(Gender.Masculine)}
                >
                    <RX.Text style={styles.buttonText}>
                        der
                    </RX.Text>
                </RX.Button>
                <RX.Button
                    style={[styles.roundedButton, styles.dieButton]}
                    onPress={() => this.handleArticle(Gender.Feminine)}
                >
                    <RX.Text style={styles.buttonText}>
                        die
                    </RX.Text>
                </RX.Button>
                <RX.Button
                    style={[styles.roundedButton, styles.dasButton]}
                    onPress={() => this.handleArticle(Gender.Neuter)}
                >
                    <RX.Text style={styles.buttonText}>
                        das
                    </RX.Text>
                </RX.Button>
            </RX.View>
        );
    }

    private handleArticle = (gender: Gender) => {
        this.props.onArticle(gender);
    }
}

interface IArticleButtonsProps {
    onArticle: (gender: Gender) => void;
}

export default ArticleButtons;
