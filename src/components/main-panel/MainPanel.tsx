import * as RX from 'reactxp';
import Panel from "../../widgets/panel/Panel";

interface MainPanelProps {
    onPressNavigate: () => void;
}

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    roundedButton: RX.Styles.createViewStyle({
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

class MainPanel extends RX.Component<MainPanelProps, null> {
    render() {
        return (
            <RX.ScrollView style={styles.scroll}>
                <Panel>
                    <RX.Text style={styles.welcome}>
                        Hello World
                    </RX.Text>

                    <RX.Button style={styles.roundedButton} onPress={this.handleNavigate}>
                        <RX.Text style={styles.buttonText}>
                            Go to next panel
                        </RX.Text>
                    </RX.Button>
                </Panel>
            </RX.ScrollView>
        );
    }

    private handleNavigate = () => {
        this.props.onPressNavigate();
    }
}

export default MainPanel;
