import { useState } from 'react';
import GameOverlay from '../components/overlay/GameOverlay';
import { useAuth } from '../contexts/AuthContext';
import { useGameContext } from '../contexts/GameWsContext';
import { usePopups } from '../contexts/PopupContext';
import ActiveUsers from '../components/overlay/ActiveUsers';
import ChatModal from '../components/messaging/ChatModal';
import Logo from '../components/Logo';

export default function GamePage() {
  const [message, setMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const { user } = useAuth();
  const { sendMessage } = useGameContext();

  const handleClick = () => {
    sendMessage('chat/user/', { message, username });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center content-center">
      <ActiveUsers></ActiveUsers>
      <GameOverlay></GameOverlay>

      <Logo className="pb-12"></Logo>
      <div className=" min-h-96 p-12 rounded-3xl flex flex-col gap-12 items-center self-center">
        <input className='bg-primary-bg p-4 rounded-xl w-96 text-center highlightshadow focus:bg-secondary-bg outline-none' placeholder='room code'></input>
        <button className='p-8 text-3xl rounded-2xl bg-highlight highlightshadow min-w-64 max-w-96 hover:opacity-50 hover:cursor-pointer'>Join</button>
      </div>
    </div>
  );
}
