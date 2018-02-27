import {inject, observer} from "mobx-react/native";
import * as React from "react";
import {Component, ReactElement} from "react";
import * as RX from "reactxp";
import {PracticeStore} from "../../model/PracticeStore";
import wordStore, {IWordEntry, WordStore} from "../../model/WordStore";
import PanelTitle from "../../widgets/panel-title/PanelTitle";
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
        return this.getWordList().length;
    }

    private getWordList(): IWordEntry[] {
        return this.getWordsOfType(this.state.selectedItem);
    }

    private getWordsOfType(selectedItem: MenuItemType): IWordEntry[] {
        const {practiceStore} = this.props;

        switch (selectedItem) {
            case MenuItemType.Favourites:
                return practiceStore.favouriteWords;

            case MenuItemType.Hot:
                return practiceStore.hotWords;

            case MenuItemType.Known:
                return practiceStore.knownWords;

            case MenuItemType.Good:
                return practiceStore.goodWords;

            case MenuItemType.Learning:
                return practiceStore.learningWords;

            default:
                return [];
        }
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
