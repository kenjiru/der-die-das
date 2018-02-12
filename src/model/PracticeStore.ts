import * as _ from "lodash";
import { action, observable, useStrict } from "mobx";
import NumberUtil from "../util/NumberUtil";
import wordStore, { Gender, IWordEntry } from "./WordStore";

useStrict(true);

export class PracticeStore {
    private static MAX_RANDOM: number = 20;
    public static MAX_CURRENT_WORDS: number = 3;

    @observable
    public pastEntries: IPracticeEntry[] = [];
    @observable
    public currentEntries: IPracticeEntry[] = [];
    @observable
    public lastEntry: IPracticeEntry;
    @observable
    public progressIndex: number = 0;

    @action
    public getNextWord(): IPracticeEntry {
        if (this.currentEntries.length < PracticeStore.MAX_CURRENT_WORDS) {
            return this.getNewEntry();
        }

        if (this.lastEntryWasHit()) {
            if (this.lastEntryWasLearned()) {
                this.removeLastEntryFromCurrent();

                return this.getNextEntry();
            }
        }

        return this.getRandomCurrentEntry();
    }

    private removeLastEntryFromCurrent(): void {
        _.remove(this.currentEntries,
            (entry: IPracticeEntry): boolean => entry.word === this.lastEntry.word);
    }

    private getNextEntry(): IPracticeEntry {
        const randomNumber: number = NumberUtil.getRandomInt(0, 100);

        if (randomNumber > 70) {
            return this.getNewEntry();
        }

        return this.getRandomPastEntry();
    }

    private getRandomCurrentEntry(): IPracticeEntry {
        const randomIndex: number = NumberUtil.getRandomInt(0, this.currentEntries.length - 1);

        const entry: IPracticeEntry = this.currentEntries[randomIndex];
        this.lastEntry = entry;

        return entry;
    }

    private getRandomPastEntry(): IPracticeEntry {
        const randomIndex: number = NumberUtil.getRandomInt(0, this.getMaxPastIndex());
        const sortedPastEntries: IPracticeEntry[] = _.sortBy(this.pastEntries,
            (entry: IPracticeEntry) => entry.lastDateAsked);

        const pastEntry: IPracticeEntry = sortedPastEntries[randomIndex];

        this.currentEntries.push(pastEntry);
        this.lastEntry = pastEntry;

        return pastEntry;
    }

    private getMaxPastIndex(): number {
        return this.pastEntries.length - 1 < PracticeStore.MAX_RANDOM
            ? this.pastEntries.length - 1
            : PracticeStore.MAX_RANDOM;
    }

    private getNewEntry(): IPracticeEntry {
        const newWord: string = wordStore.getWord(this.progressIndex);
        const newEntry: IPracticeEntry = this.createNewEntry(newWord);

        this.pastEntries.push(newEntry);
        this.currentEntries.push(newEntry);
        this.lastEntry = newEntry;

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

        console.log(_.takeRight(lastEntry.lastFive, 5));
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
