import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import constants from "../../../util/StyleConstants";

const styles = {
    menuFiller: RX.Styles.createViewStyle({
        flexGrow: 3,
        height: constants.HUGE_SPACING
    }),
    label: RX.Styles.createViewStyle({
        flexGrow: 2,
        backgroundColor: constants.MENU_BACKGROUND
    }),
    underline: RX.Styles.createViewStyle({
        height: constants.SMALL_SPACING,
        backgroundColor: constants.MENU_UNDERLINE
    }),
};

class MenuFiller extends Component<IMenuFillerProps, IMenuFillerState> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.menuFiller}>
                <RX.View style={styles.label}/>
                <RX.View style={styles.underline}/>
            </RX.View>
        );
    }
}

interface IMenuFillerState {
}

interface IMenuFillerProps {
}

export default MenuFiller;
