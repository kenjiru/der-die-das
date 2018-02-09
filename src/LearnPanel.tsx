import * as RX from 'reactxp';

interface LearnPanelProps {
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

class LearnPanel extends RX.Component<LearnPanelProps> {
    render() {
        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.textContainer}>
                    <RX.Text style={styles.wordText}>
                        ●●● Augenblick
                    </RX.Text>

                    <RX.Text style={styles.translationText}>
                        moment
                    </RX.Text>

                    <RX.View style={styles.feedbackContainer}>
                        <RX.View style={[styles.resBox, styles.hitBox]}></RX.View>
                        <RX.View style={[styles.resBox, styles.hitBox]}></RX.View>
                        <RX.View style={[styles.resBox, styles.missBox]}></RX.View>
                    </RX.View>
                </RX.View>

                <RX.View style={styles.middleContainer}>
                </RX.View>

                <RX.View style={styles.buttonContainer}>
                    <RX.Button style={[styles.roundButton, styles.derButton]} onPress={this.handleBack}>
                        <RX.Text style={styles.buttonText}>
                            der
                        </RX.Text>
                    </RX.Button>
                    <RX.Button style={[styles.roundButton, styles.dieButton]} onPress={this.handleBack}>
                        <RX.Text style={styles.buttonText}>
                            die
                        </RX.Text>
                    </RX.Button>
                    <RX.Button style={[styles.roundButton, styles.dasButton]} onPress={this.handleBack}>
                        <RX.Text style={styles.buttonText}>
                            das
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.View>
        );
    }

    private handleBack = () => {
        this.props.onNavigateBack();
    }
}

export default LearnPanel;
