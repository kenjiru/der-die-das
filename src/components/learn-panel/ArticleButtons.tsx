import * as React from "react";
import { Component, ReactElement } from "react";
import * as RX from 'reactxp';
import { Gender } from "../../model/WordStore";

const styles = {
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

class ArticleButtons extends Component<IArticleButtonsProps> {
    public render(): ReactElement<HTMLElement> {
        return (
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
