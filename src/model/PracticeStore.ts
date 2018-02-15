import * as _ from "lodash";
import { action, computed, observable, useStrict } from "mobx";
import NumberUtil from "../util/NumberUtil";
import wordStore, { Gender, IWordEntry } from "./WordStore";

useStrict(true);

export class PracticeStore {
    private static MAX_RANDOM: number = 20;
    public static MAX_CURRENT_WORDS: number = 3;
    public static TWO_DAYS: number = 1000 * 60 * 60 * 24 * 2;

    @observable
    public pastEntries: IPracticeEntry[] = [];
    @observable
    public currentEntries: IPracticeEntry[] = [];
    @observable
    public currentWord: string;
    @observable
    public progressIndex: number = 0;

    @computed
    get lastEntry(): IPracticeEntry {
        if (_.isNil(this.currentWord)) {
            return null;
        }

        return _.find(this.currentEntries,
            (entry: IPracticeEntry) => entry.word === this.currentWord);
    }

    @action
    public getNextWord(): void {
        let nextEntry: IPracticeEntry;

        if (this.currentEntries.length < PracticeStore.MAX_CURRENT_WORDS) {
            nextEntry = this.getNewEntry();
            this.addToCurrentEntries(nextEntry);
        } else {
            if (this.lastEntryWasHit()) {
                if (this.lastEntryWasLearned()) {
                    nextEntry = this.getNextEntry();

                    this.removeFromCurrent(this.currentWord);
                }
            }

            nextEntry = this.getRandomCurrentEntry();
        }

        this.currentWord = nextEntry.word;
    }

    private getNextEntry(): IPracticeEntry {
        const randomNumber: number = NumberUtil.getRandomInt(0, 100);
        let entry: IPracticeEntry;

        if (randomNumber > 70) {
            entry = this.getNewEntry();
            this.addToPastEntries(entry);
        } else {
            entry = this.getRandomPastEntry();

            if (_.isNil(entry)) {
                entry = this.getNewEntry();
                this.addToPastEntries(entry);
            }
        }

        this.addToCurrentEntries(entry);

        return entry;
    }

    private getRandomCurrentEntry(): IPracticeEntry {
        const currentEntries: IPracticeEntry[] = _.filter(this.currentEntries,
            (entry: IPracticeEntry) => entry.word !== this.currentWord);
        const randomIndex: number = NumberUtil.getRandomInt(0, currentEntries.length - 1);

        return currentEntries[randomIndex];
    }

    private getRandomPastEntry(): IPracticeEntry {
        const pastEntries: IPracticeEntry[] = _.differenceBy(this.pastEntries, this.currentEntries,
            (entry: IPracticeEntry) => entry.word);

        const filteredPastEntries: IPracticeEntry[] = _.filter(pastEntries,
            (entry: IPracticeEntry) => entry.lastDateAsked - Date.now() > PracticeStore.TWO_DAYS);

        const sortedPastEntries: IPracticeEntry[] = _.sortBy(filteredPastEntries,
            (entry: IPracticeEntry) => entry.lastDateAsked);

        if (sortedPastEntries.length === 0) {
            return null;
        }

        const randomIndex: number = NumberUtil.getRandomInt(0, this.getMaxPastIndex(pastEntries.length));

        return sortedPastEntries[randomIndex];
    }

    private getMaxPastIndex(length: number): number {
        return length - 1 < PracticeStore.MAX_RANDOM ? length - 1 : PracticeStore.MAX_RANDOM;
    }

    private getNewEntry(): IPracticeEntry {
        const newWord: string = wordStore.getWord(this.progressIndex);
        const newEntry: IPracticeEntry = this.createNewEntry(newWord);

        ++this.progressIndex;

        return newEntry;
    }

    private createNewEntry(word: string): IPracticeEntry {
        return {
            word,
            hit: 0,
            miss: 0,
            consecutiveHit: 0,
            lastFive: []
        }
    }

    private addToCurrentEntries(entry: IPracticeEntry): void {
        this.currentEntries.push(entry);
    }

    private removeFromCurrent(word: string): void {
        _.remove(this.currentEntries,
            (entry: IPracticeEntry): boolean => entry.word === word);
    }

    private addToPastEntries(entry: IPracticeEntry): void {
        this.pastEntries.push(entry);
    }

    private removeFromPast(word: string): void {
        _.remove(this.pastEntries,
            (entry: IPracticeEntry): boolean => entry.word === word);
    }

    private lastEntryWasLearned(): boolean {
        return this.lastEntry.consecutiveHit === 5;
    }

    private lastEntryWasHit(): boolean {
        return this.wasEntryHit(this.lastEntry);
    }

    private wasEntryHit(entry: IPracticeEntry): boolean {
        return entry.lastFive[entry.lastFive.length - 1] || false;
    }

    @action
    public updateLastPractice(gender: Gender): void {
        const wordEntry: IWordEntry = wordStore.findWord(this.lastEntry.word);
        const isHit: boolean = (wordEntry.gender === gender);

        this.updateLastEntryScore(isHit);
    }

    private updateLastEntryScore(isHit: boolean = true): void {
        const lastEntry: IPracticeEntry = this.lastEntry;

        lastEntry.lastFive.push(isHit);

        let hit: number = lastEntry.hit;
        let consecutiveHit: number = lastEntry.consecutiveHit;
        let miss: number = lastEntry.miss;

        if (isHit) {
            consecutiveHit++;
            hit++;
        } else {
            consecutiveHit = 0;
            miss++;
        }

        _.assign(lastEntry, {
            hit,
            consecutiveHit,
            miss,
            lastFive: _.takeRight(lastEntry.lastFive, 5),
            lastDateAsked: Date.now()
        });
    }
}

export interface IPracticeEntry {
    word: string;
    hit: number;
    consecutiveHit: number;
    miss: number;
    lastFive: boolean[];
    lastDateAsked?: number;
}

const practiceStore: PracticeStore = new PracticeStore();

export default practiceStore;
