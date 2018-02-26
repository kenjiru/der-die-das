import {inject, observer} from "mobx-react/native";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {PracticeStore} from "../../model/PracticeStore";
import wordStore, {IWordEntry, WordStore} from "../../model/WordStore";
import PanelTitle from "../panel-title/PanelTitle";
import Panel from "../../widgets/panel/Panel";
import List from "./list/List";
import Menu, {MenuItemType} from "./menu/Menu";

@inject("wordStore")
@inject("practiceStore")
@observer
class WordsPanel extends Component<IWordsPanelProps, IWordsPanelState> {
    constructor(props: IWordsPanelProps) {
        super(props);

        this.state = {
            selectedItem: MenuItemType.Favourites
        };
    }

    public render(): ReactElement<HTMLElement> {
        return (
            <Panel>
                <PanelTitle
                    title="Learned Words"
                    hasSettings={false}
                />
                <Menu
                    availableItems={this.getAvailableItems()}
                    numWords={this.getNumWords()}
                    selectedItem={this.state.selectedItem}
                    onChange={this.handleMenuChange}
                />
                <List
                    words={this.getWordList()}
                    listType={this.state.selectedItem}
                />
            </Panel>
        );
    }

    private handleMenuChange = (selectedItem: MenuItemType) => {
        this.setState({
            selectedItem
        });
    }

    private getAvailableItems(): MenuItemType[] {
        return [
            MenuItemType.Favourites,
            MenuItemType.Hot,
            MenuItemType.Good,
            MenuItemType.Known,
            MenuItemType.Learning
        ];
    }

    private getNumWords(): number {
        return this.props.wordStore.words.length
    }

    private getWordList(): IWordEntry[] {
        return this.props.wordStore.words;
    }
}

interface IWordsPanelState {
    selectedItem: MenuItemType;
}

interface IWordsPanelProps {
    practiceStore?: PracticeStore;
    wordStore?: WordStore;
}

export default WordsPanel;
