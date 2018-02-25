import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {TextStyleRuleSet, ViewStyleRuleSet} from "reactxp/dist/common/Types";
import constants from "../../../util/StyleConstants";
import FavouriteImage from "../../../widgets/images/FavouriteImage";
import FireImage from "../../../widgets/images/FireImage";
import {MenuItemType} from "./Menu";

const styles = {
    menuItem: RX.Styles.createViewStyle({
        flexGrow: 1,
        height: constants.HUGE_SPACING
    }),
    label: RX.Styles.createViewStyle({
        flexGrow: 2,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    }),
    labelText: RX.Styles.createTextStyle({
        textAlign: "center",
        fontSize: constants.SMALL_TEXT + 2
    }),
    underline: RX.Styles.createViewStyle({
        height: constants.SMALL_SPACING
    }),
};

class MenuItem extends Component<IMenuItemProps> {
    public render(): ReactElement<any> {
        return (
            <RX.Button
                style={styles.menuItem}
                onPress={this.props.onPress}
            >
                <RX.View style={[styles.label, this.getLabelStyle()]}>
                    {this.getLabel()}
                </RX.View>
                <RX.View style={[styles.underline, this.getUnderlineStyle()]}>
                </RX.View>
            </RX.Button>
        )
    }

    private getLabel(): ReactElement<any> {
        const type: MenuItemType = this.props.menuItemType;

        if (type === MenuItemType.Favourites) {
            return (
                <FavouriteImage
                    width={constants.SMALL_ICON}
                    height={constants.SMALL_ICON}
                    color={constants.FAV_COLOR}
                />
            );
        }

        if (type === MenuItemType.Hot) {
            return (
                <FireImage
                    width={constants.SMALL_ICON}
                    height={constants.SMALL_ICON}
                    color={constants.FIRE_COLOR}
                />
            );
        }

        return (
            <RX.Text style={[styles.labelText, this.getLabelTextStyle()]}>
                {type} {this.renderNumWords()}
            </RX.Text>
        );
    }

    private renderNumWords(): string {
        const {isSelected, numWords} = this.props;

        if (isSelected) {
            return `(${numWords})`;
        }

        return undefined;
    }

    private getLabelTextStyle(): TextStyleRuleSet {
        if (this.props.isSelected) {
            return {
                color: constants.WHITE
            };
        }

        return undefined;
    }

    private getLabelStyle(): ViewStyleRuleSet {
        let backgroundColor: string;

        if (this.props.isSelected) {
            backgroundColor = this.getBackgroundColor();

            if (_.isNil(backgroundColor)) {
                backgroundColor = constants.MENU_BACKGROUND_SELECTED;
            }
        } else {
            backgroundColor = constants.MENU_BACKGROUND;
        }

        return {
            backgroundColor
        };
    }

    private getUnderlineStyle(): ViewStyleRuleSet {
        let backgroundColor: string = this.getBackgroundColor();

        if (_.isNil(backgroundColor)) {
            if (this.props.isSelected) {
                backgroundColor = constants.MENU_BACKGROUND_SELECTED;
            } else {
                backgroundColor = constants.MENU_UNDERLINE;
            }
        }

        return {
            backgroundColor
        };
    }

    private getBackgroundColor(): string {
        switch (this.props.menuItemType) {
            case MenuItemType.Good:
                return constants.DER_COLOR;
            case MenuItemType.Known:
                return constants.DIE_COLOR;
            case MenuItemType.Learning:
                return constants.DAS_COLOR;
            default:
                return undefined;
        }
    }
}

interface IMenuItemProps {
    menuItemType: MenuItemType;
    numWords: number;
    isSelected: boolean;
    onPress: () => void;
}

export default MenuItem;
