import { Provider } from "mobx-react/native";
import * as RX from 'reactxp';
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation';
import LearnPanel from './components/learn-panel/LearnPanel';

import MainPanel from './components/main-panel/MainPanel';
import practiceStore from "./model/PracticeStore";

enum NavigationRouteId {
    MainPanel,
    LearnPanel
}

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    }, false)
};

class App extends RX.Component<{}, null> {
    private navigator: Navigator;

    componentDidMount() {
        this.navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.LearnPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Provider practiceStore={practiceStore}>
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
        this.navigator = navigator;
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <MainPanel onPressNavigate={this.handlePressNavigate}/>;

            case NavigationRouteId.LearnPanel:
                return <LearnPanel onNavigateBack={this.handlePressBack}/>;
        }

        return null;
    }

    private handlePressNavigate = () => {
        this.navigator.push({
            routeId: NavigationRouteId.LearnPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
        });
    }

    private handlePressBack = () => {
        this.navigator.pop();
    }
}

export default App;
