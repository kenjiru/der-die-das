import * as _ from "lodash";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {ViewOnLayoutEvent} from "reactxp/src/common/Types";
import {IWordEntry} from "../../../model/WordStore";
import constants from "../../../util/StyleConstants";
import {MenuItemType} from "../menu/Menu";
import ListItem from "./ListItem";

const styles = {
    list: RX.Styles.createViewStyle({
        flexGrow: 2,
        flexDirection: "column",
        marginTop: constants.MEDIUM_SPACING
    }),
    menuItem: RX.Styles.createViewStyle({}),
    label: RX.Styles.createViewStyle({}),
    underline: RX.Styles.createViewStyle({}),
};

class List extends Component<IListProps, IListState> {
    constructor(props: IListProps) {
        super(props);

        this.state = {
            width: 0
        };
    }

    public render(): ReactElement<HTMLElement> {
        return (
            <RX.View
                style={styles.list}
                onLayout={this.handleLayout}
            >
                {this.renderListItems()}
            </RX.View>
        );
    }

    private renderListItems(): ReactElement<any>[] {
        return _.map(this.props.words, (word: IWordEntry, index: number): ReactElement<any> =>
            <ListItem
                key={index}
                word={word}
                wordType={this.props.listType}
                width={this.state.width}
            />
        );
    }

    private handleLayout = (layout: ViewOnLayoutEvent) => {
        this.setState({
            width: layout.width
        });
    }
}

interface IListState {
    width: number;
}

interface IListProps {
    words: IWordEntry[];
    listType: MenuItemType;
}

export default List;
