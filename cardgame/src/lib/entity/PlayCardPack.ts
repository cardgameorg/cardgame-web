import CardPack from "./CardPack";
import PlayCard from "./PlayCard";

export default interface PlayCardPack extends CardPack {
    cards: PlayCard[];
}