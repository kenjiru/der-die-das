import {inject, observer} from "mobx-react/native";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {IPracticeEntry, PracticeStore} from "../../model/PracticeStore";
import constants from "../../util/StyleConstants";
import FavouriteButton from "./FavouriteButton";

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 2,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: constants.MEDIUM_SPACING
    }),
    buttonsContainer: RX.Styles.createViewStyle({
        flexDirection: "row"
    })
};

@inject("practiceStore")
@observer
class ActionButtons extends Component<IActionButtonsProps> {
    public render(): ReactElement<HTMLElement> {
        const lastEntry: IPracticeEntry = this.props.practiceStore.lastEntry;

        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.buttonsContainer}>
                    <FavouriteButton
                        isSelected={lastEntry.isFavourite}
                        onPress={this.handleFavouritePress}
                    />
                </RX.View>
            </RX.View>
        );
    }

    private handleFavouritePress = () => {
        this.props.practiceStore.toggleLastEntryFavourite();
    }
}

interface IActionButtonsProps {
    practiceStore?: PracticeStore;
}

export default ActionButtons;
