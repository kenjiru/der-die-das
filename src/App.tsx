import * as RX from 'reactxp';
/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android
import Navigator, { NavigatorDelegateSelector as DelegateSelector, Types } from 'reactxp-navigation';
import LearnPanel from './LearnPanel';

import MainPanel from './MainPanel';

enum NavigationRouteId {
    MainPanel,
    SecondPanel
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
            routeId: NavigationRouteId.MainPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Navigator
                ref={this.handleNavigatorRef}
                renderScene={this.renderScene}
                cardStyle={styles.navCardStyle}
                delegateSelector={DelegateSelector}
            />
        );
    }

    private handleNavigatorRef = (navigator: Navigator) => {
        this.navigator = navigator;
    }

    private renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <MainPanel onPressNavigate={this.handlePressNavigate}/>;

            case NavigationRouteId.SecondPanel:
                return <LearnPanel onNavigateBack={this.handlePressBack}/>;
        }

        return null;
    }

    private handlePressNavigate = () => {
        this.navigator.push({
            routeId: NavigationRouteId.SecondPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
        });
    }

    private handlePressBack = () => {
        this.navigator.pop();
    }
}

export default App;
