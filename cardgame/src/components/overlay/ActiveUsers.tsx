import { useEffect, useState } from 'react';
import User from '../../lib/entity/User';
import FetchAPI from '../../lib/api/fetch';
import { useGameContext } from '../../contexts/GameWsContext';
import { usePopups } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong } from '@fortawesome/free-solid-svg-icons/faDownLong';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import ChatModal from '../messaging/ChatModal';

export default function ActiveUsers() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const { stompClient } = useGameContext();
  const { user } = useAuth();

  // New state to store the selected user for chatting
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);

  const handleFetch = async () => {
    console.log('Fetching active users...');
    const response = await FetchAPI('api/v1/public/activeusers/all', 'GET', null);
    if (response) {
      const data = await response.json();
      console.log('Fetched users:', data);
      setActiveUsers(data);
    }
  };

  const filterOutCurrentUser = (users: User[], currentUserId: any) => {
    return users.filter((usr) => usr.id !== user!.id); // Filter out the current user by ID
  };

  useEffect(() => {
    // Fetch data on mount
    handleFetch();

    // Ensure stompClient is connected before attempting to subscribe
    const connectAndSubscribe = () => {
      if (stompClient?.connected) {
        console.log('WebSocket is connected, subscribing to /topic/activeUsers...');
        const subscription = stompClient.subscribe('/topic/activeUsers', (message) => {
          const users: User[] = JSON.parse(message.body);
          console.log('Received update:', users);
          setActiveUsers(users);
        });

        // Cleanup on unmount
        return () => {
          console.log('Unsubscribing from activeUsers topic...');
          subscription.unsubscribe();
        };
      } else {
        console.log('WebSocket is not connected yet. Retrying...');
      }
    };

    // Retry connection until successful
    const intervalId = setInterval(() => {
      if (stompClient?.connected) {
        connectAndSubscribe();
        clearInterval(intervalId); // Stop retrying once the connection is established
      }
    }, 1000); // Check every second

    // Cleanup the interval when component unmounts or stompClient changes
    return () => {
      clearInterval(intervalId);
    };
  }, [stompClient]);

  return (
    <div className="fixed top-0 left-0 flex flex-col p-5 gradientbg rounded-xl shadow-lg shadow-black m-5 overflow-y-auto">
      <div className="flex flex-row">
        <FontAwesomeIcon
          onClick={() => {
            setVisible(!visible);
          }}
          icon={visible ? faUpLong : faDownLong}
          className="self-center p-3 rounded-full bg-[#31218C] hover:bg-[#4931CE] hover:cursor-pointer hover:shadow-[#4931CE] hover:shadow-md aspect-square"
        />
        <p className="text-xl font-bold self-center p-2 pointer-events-none">Active users ({filterOutCurrentUser(activeUsers,user!).length})</p>
      </div>
      {visible &&
        filterOutCurrentUser(activeUsers, user!).map((usr) => (
          <div
            key={usr.id}
            className="flex flex-row pt-3 rounded-xl justify-items-center my-1 cursor-pointer"
            onClick={() => setSelectedChatUser(usr)}
          >
            <img
              className="w-10 h-10 self-center rounded-full"
              src={usr.profileImg}
              alt={usr.username}
            />
            <p className="ml-4 text-xl self-center">{usr.username}</p>
          </div>
        ))}
      
      {selectedChatUser && (
        <ChatModal
          isOpen={true}
          onClose={() => setSelectedChatUser(null)}
          friendUsername={selectedChatUser.username}
        />
      )}
    </div>
  );
}
