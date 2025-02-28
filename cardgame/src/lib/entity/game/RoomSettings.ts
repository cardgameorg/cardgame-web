export default interface RoomSettings {
    maxUsers: number;
    rounds: number;
    deckCards: number;
    roundTime: 0 | 30 | 60 | 90;
    isStarted: boolean;

}