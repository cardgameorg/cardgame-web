import PlayCard from "../PlayCard";

export enum RoundState {
    WAITING_FOR_PROMPT,
    WAITING_FOR_PLAYERS,
    WAITING_FOR_BEST,
    SHOWCASE
}

export default interface Round {
    index: number;
    stateTimerStart: number;
    playedCards: PlayCard[];
}