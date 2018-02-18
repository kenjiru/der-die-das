import { Provider } from "mobx-react/native";
import * as RX from 'reactxp';
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation';
import LearnPanel from './components/learn-panel/LearnPanel';

import MainPanel from './components/main-panel/MainPanel';
import SettingsPanel from "./components/settings-panel/SettingsPanel";
import practiceStore from "./model/PracticeStore";
import settingsStore from "./model/SettingsStore";

export enum NavigationRouteId {
    MainPanel,
    LearnPanel,
    SettingsPanel
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    }, false)
};

class App extends RX.Component<{}, null> {

    componentDidMount() {
        settingsStore.navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.LearnPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Provider practiceStore={practiceStore} settingsStore={settingsStore}>
                <Navigator
                    ref={this.handleNavigatorRef}
                    renderScene={this.renderScene}
                    cardStyle={styles.navCardStyle}
                    delegateSelector={DelegateSelector}
                />
            </Provider>
        );
    }

    private handleNavigatorRef = (navigator: Navigator) => {
        settingsStore.setNavigator(navigator);
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <MainPanel/>;

            case NavigationRouteId.LearnPanel:
                return <LearnPanel/>;

            case NavigationRouteId.SettingsPanel:
                return <SettingsPanel/>;
        }

        return null;
    }
}

export default App;
