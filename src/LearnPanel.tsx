import * as RX from 'reactxp';

interface LearnPanelProps {
    onNavigateBack: () => void;
}

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    titleText: RX.Styles.createTextStyle({
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
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
            <RX.ScrollView style={styles.scroll}>
                <RX.View style={styles.container}>
                    <RX.Button style={styles.roundButton} onPress={this.handleBack}>
                        <RX.Text style={styles.buttonText}>
                            Go Back
                        </RX.Text>
                    </RX.Button>

                    <RX.Text style={styles.titleText}>
                        Learn Panel
                    </RX.Text>
                </RX.View>
            </RX.ScrollView>
        );
    }

    private handleBack = () => {
        this.props.onNavigateBack();
    }
}

export default LearnPanel;
