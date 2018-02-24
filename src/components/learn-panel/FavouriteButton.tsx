import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import constants from "../../util/StyleConstants";
import FavoriteImage from "../../widgets/images/FavouriteImage";

class FavouriteButton extends Component<IFavouriteButtonProps> {
    private static NORMAL_COLOR: string = constants.LIGHT_GRAY;
    private static SELECTED_COLOR: string = constants.FAV_COLOR;

    public render(): ReactElement<HTMLElement> {
        return (
            <RX.Button onPress={this.props.onPress}>
                <FavoriteImage
                    height={constants.HUGE_ICON}
                    width={constants.HUGE_ICON}
                    color={this.getImageColor()}
                />
            </RX.Button>
        );
    }

    private getImageColor(): string {
        return this.props.isSelected ?
            FavouriteButton.SELECTED_COLOR :
            FavouriteButton.NORMAL_COLOR;
    }
}

interface IFavouriteButtonProps {
    isSelected: boolean;
    onPress: () => void;
}

export default FavouriteButton;
