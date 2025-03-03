import { useState } from "react";
import GameOverlay from "../components/overlay/GameOverlay";
import { useAuth } from "../contexts/AuthContext"
import { useGameContext } from "../contexts/GameWsContext";
import { usePopups } from "../contexts/PopupContext";
import ActiveUsers from "../components/overlay/ActiveUsers";
import ChatModal from "../components/messaging/ChatModal";

export default function GamePage() {
    const [message, setMessage] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    
    const {user} = useAuth();
    const {sendMessage} = useGameContext();

    const handleClick = () => {
        sendMessage("chat/user/",{message,username});
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
      };

      const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      };

    return <div className="w-full h-full flex flex-col items-center justify-center content-center">
      <ActiveUsers></ActiveUsers>
      
        <GameOverlay></GameOverlay>
        <h1>Helló {user?.username}!</h1>
        <button onClick={handleClick}>nyomj</button>
        <input onChange={handleInputChange} type="text" name="" id="" placeholder="uzenet ide" />
        username:
        <input
          placeholder="username"
          onChange={handleUsernameChange}
          className="bg-gray-950 p-2 rounded-xl text-center"
        ></input>
    </div>
}