import CardPack from "./CardPack";
import PromptCard from "./PromptCard";

export default interface PromptCardPack extends CardPack {
    cards: PromptCard[];
}