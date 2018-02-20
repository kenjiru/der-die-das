import * as RX from 'reactxp';
import Panel from "../../widgets/panel/Panel";
import PanelTitle from "../panel-title/PanelTitle";

const styles = {
};

class OverviewPanel extends RX.Component<MainPanelProps> {
    private static APP_TITLE: string = "Der Die Das";

    render() {
        return (
            <Panel>
                <PanelTitle
                    title={OverviewPanel.APP_TITLE}
                    hasBack={false}
                />

            </Panel>
        );
    }
}

interface MainPanelProps {
}

export default OverviewPanel;
