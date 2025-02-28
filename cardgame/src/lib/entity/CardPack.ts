import User from "./User";

export default interface CardPack {
    id: string; // nanoid
    owner: User;
    name: string;
    descTitle: string;
    descText: string;
}