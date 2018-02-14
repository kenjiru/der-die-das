import * as _ from "lodash";

export class WordStore {
    public words: IWordEntry[] = [];

    public findWord(word: string): IWordEntry {
        return _.find(this.words, (wordEntry: IWordEntry): boolean => wordEntry.word === word);
    }

    public getWord(index: number): string {
        return this.words[index].word;
    }
}

export interface IWordEntry {
    word: string;
    translation: string;
    gender: Gender;
    sentence?: string;
}

export enum Gender {
    Masculine = "der",
    Feminine = "die",
    Neuter = "das"
}

const wordStore: WordStore = new WordStore();
wordStore.words.push.apply(wordStore.words, [{
    word: 'Antail',
    translation: 'fraction',
    gender: Gender.Masculine
}, {
    word: 'Job',
    translation: 'job',
    gender: Gender.Masculine
}, {
    word: 'Fisch',
    translation: 'fish',
    gender: Gender.Masculine
}, {
    word: 'Baby',
    translation: 'baby',
    gender: Gender.Neuter
}, {
    word: 'Durschsetzung',
    translation: 'enforcement',
    gender: Gender.Feminine
}, {
    word: 'Familie',
    translation: 'family',
    gender: Gender.Feminine
}, {
    word: 'Durschsetzung',
    translation: 'enforcement',
    gender: Gender.Feminine
}, {
    word: 'Gegenteil',
    translation: 'contrary',
    gender: Gender.Neuter
}, {
    word: 'Wort',
    translation: 'word',
    gender: Gender.Neuter
}]);

export default wordStore;
