import GameOverlay from "../components/overlay/GameOverlay";
import { useAuth } from "../contexts/AuthContext"
import { usePopups } from "../contexts/PopupContext";

export default function GamePage() {
    const {user} = useAuth();
    const {addPopup} = usePopups();

    const handleClick = () => {
        addPopup("Szerver mondja: "+ Math.floor( Math.random()*100000))
    }

    return <div className="w-full h-full flex flex-col items-center justify-center content-center">
        <GameOverlay></GameOverlay>
        <h1>Helló {user?.username}!</h1>
        <button onClick={handleClick}>nyomj</button>
    </div>
}