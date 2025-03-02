import PlayCardPack from "../PlayCardPack";
import PromptCardPack from "../PromptCardPack";
import Player from "./Player";
import RoomSettings from "./RoomSettings";

export default interface GameRoom {
    id : string;
    players: Player[];
    settings: RoomSettings;
    owner: Player;
    playCardPack: PlayCardPack;
    promptCardPack: PromptCardPack;
    isStarted: boolean;
    winner: Player | undefined;
    gameEnded: boolean;
}