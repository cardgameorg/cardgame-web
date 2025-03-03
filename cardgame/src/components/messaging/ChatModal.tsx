import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { useGameContext } from '../../contexts/GameWsContext';
import { useAuth } from '../../contexts/AuthContext';
import FetchAPI from '../../lib/api/fetch';

Modal.setAppElement('#root');

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendUsername: string; // target user's username (the friend you are chatting with)
}

interface ChatMessage {
  message: string;
  user: {
    username: string;
  };
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, friendUsername }) => {
  const { user } = useAuth(); // currently logged in user
  const { stompClient } = useGameContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

  // Reference to the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch the historical messages from the backend
  const fetchMessages = async () => {
    if (!user || !friendUsername) return;
    const response = await FetchAPI(`api/v1/messages/user/${friendUsername}`, 'GET', null);
    if (response) {
      const data = await response.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchMessages();
    }
  }, [isOpen, user, friendUsername]);

  // Subscribe to the currently logged in user's queue to receive incoming messages.
  // With Spring's convertAndSendToUser, the client must subscribe using the `/user` prefix.
  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    if (isOpen && user && stompClient && stompClient.connected) {
      sub = stompClient.subscribe(`/user/queue/chat/${friendUsername}`, (msg: { body: string }) => {
        const incomingMessage = JSON.parse(msg.body) as ChatMessage;
        // Filter messages to include only those exchanged with friendUsername
        if (incomingMessage.user.username === friendUsername || incomingMessage.user.username === user.username) {
          setMessages((prev) => [...prev, incomingMessage]);
        }
      });
    }
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [isOpen, user, friendUsername, stompClient]);

  // Send a message to the friend.
  const sendMessage = () => {
    if (stompClient && message.trim() !== '' && user) {
      const targetedMessage = { username: friendUsername, message };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
      setMessage('');
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Trigger scroll whenever messages change

  return (
    <Modal
    style={{
      overlay: {
        backgroundColor: '#23232323', // Removes backdrop
      },
    }}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex justify-center content-center items-center w-full h-full backdrop-blur-sm"
    >
      <div className="h-1/2 w-1/2 bg-black flex flex-col p-5 rounded-4xl shadow-lg shadow-black">
        <div className='flex flex-row justify-between pr-6'>
          <p className="text-2xl pb-2">
            Chat with <span className="text-[#4931CE] font-black">{friendUsername}</span>
          </p>
          <button onClick={onClose} className='align-self-end'>Close</button>
        </div>
        <div className="flex flex-col overflow-y-scroll no-scrollbar rounded-xl">
          <div>
            {messages.map((msg, index) => (
              <div key={index} className="py-1">
                <strong className={`${msg.user.username === user!.username ? 'text-[#777777]' : 'text-[#4931CE]'}`}>
                  {msg.user.username}:
                </strong>
                {msg.message}
              </div>
            ))}
          </div>
          {/* This div is used as the marker for the scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>
        <div className="w-full flex flex-row justify-between pt-2 pr-6">
          <input
            className="w-9/12 p-2"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
