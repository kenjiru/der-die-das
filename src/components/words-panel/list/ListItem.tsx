import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {ViewStyleRuleSet} from "reactxp/dist/common/Types";
import {IWordEntry} from "../../../model/WordStore";
import constants from "../../../util/StyleConstants";
import FavouriteImage from "../../../widgets/images/FavouriteImage";
import FireImage from "../../../widgets/images/FireImage";
import {MenuItemType} from "../menu/Menu";

const styles = {
    listItem: RX.Styles.createViewStyle({
        flexDirection: "row",
    }),
    word: RX.Styles.createViewStyle({
        flexDirection: "row",
        justifyContent: "flex-end",
        borderRightWidth: 2,
        borderColor: constants.DARK_RED,
        paddingRight: constants.MEDIUM_SPACING,
        paddingVertical: constants.SMALL_SPACING
    }),
    wordIcon: RX.Styles.createViewStyle({
        marginLeft: constants.SMALL_SPACING
    }),
    translation: RX.Styles.createViewStyle({
        paddingLeft: constants.MEDIUM_SPACING,
        paddingVertical: constants.SMALL_SPACING
    }),
};

class ListItem extends Component<IListItemProps> {
    public render(): ReactElement<HTMLElement> {
        const {word} = this.props;

        return (
            <RX.View style={styles.listItem}>
                <RX.View style={[styles.word, this.getWidthStyle(0.6)]}>
                    <RX.Text>{word.word}</RX.Text>
                    <RX.View style={styles.wordIcon}>
                        {this.renderWordIcon()}
                    </RX.View>
                </RX.View>
                <RX.View style={[styles.translation, this.getWidthStyle(0.4)]}>
                    <RX.Text>{word.translation}</RX.Text>
                </RX.View>
            </RX.View>
        );
    }

    private renderWordIcon(): ReactElement<any> {
        const type: MenuItemType = this.props.wordType;

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

        return undefined;
    }

    private getWidthStyle(percentage: number): ViewStyleRuleSet {
        return {
            width: this.props.width * percentage
        };
    }
}

interface IListItemProps {
    wordType: MenuItemType;
    word: IWordEntry;
    width: number;
}

export default ListItem;
