import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import constants from "../../../util/StyleConstants";
import MenuFiller from "./MenuFiller";
import MenuItem from "./MenuItem";

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: "row",
        borderColor: constants.LIGHT_GRAY,
        borderStyle: 'solid',
        borderBottomWidth: 1,
    }),
};

class Menu extends Component<IMenuProps> {
    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View style={styles.container}>
                <MenuFiller/>
                {this.renderMenuItems()}
            </RX.View>
        );
    }

    private renderMenuItems(): ReactElement<any>[] {
        return _.map(this.props.availableItems,
            (menuItemType: MenuItemType, index: number): ReactElement<any> => {
                const isSelected: boolean = menuItemType === this.props.selectedItem;

                return (
                    <MenuItem
                        key={index}
                        menuItemType={menuItemType}
                        numWords={this.props.numWords}
                        isSelected={isSelected}
                        onPress={() => this.props.onChange(menuItemType)}
                    />
                );
            });
    }
}

export enum MenuItemType {
    Favourites,
    Hot,
    Good = "Good",
    Known = "Known",
    Learning = "Learning"
}

interface IMenuProps {
    availableItems: MenuItemType[];
    selectedItem: MenuItemType;
    numWords: number;
    onChange: (selectedItem: MenuItemType) => void;
}

export default Menu;
