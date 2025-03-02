import PlayCard from "../PlayCard";
import PromptCard from "../PromptCard";
import User from "../User";

export default interface Player extends User {
    isReady: boolean;
    points: number;
    index:number;
    ownedPlayCards?: PlayCard[];
    ownedPromptCards?: PromptCard[];
}