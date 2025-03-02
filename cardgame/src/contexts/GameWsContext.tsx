import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { createContext, useRef, useState } from 'react';
import { useContext, useEffect } from 'react';
import GameRoom from '../lib/entity/game/Room';
import Player from '../lib/entity/game/Player';
import { useAuth } from './AuthContext';

const SOCKET_URL = 'http://localhost:8080/ws';

export interface GameContextType {
  room: GameRoom | null;
  self: Player | null ;
  joinRoom: (roomid: string) => void;
  createRoom: () => void;
  messages: string[];

}


// SUBSCRIBE TO /USER/{USERID}/QUEUE/MESSAGES

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [self, setSelf] = useState<Player | null>(null)
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const subscribedRoomId = useRef<string | null>(null);
  const subscriptions = useRef(new Map<string, any>()); 
  const [messages, setMessages] = useState<string[]>([]);
  const {user} = useAuth();

  //initialize connection
  useEffect(() => {
    if (user) {
    const connectWebSocket = async () => {
      console.log('Mounting WebSocket');

      const socket = new SockJS(SOCKET_URL,
         null,
         { withCredentials: true } as any); // SockJS
      const client = new Client({
        webSocketFactory: () => socket,
        // connectHeaders: {
        //   auth: `Bearer ${token}`,
        // },
        debug: (msg) => console.log('STOMP Debug: ' + msg),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('Connected to WebSocket');
          setConnected(true);
          // stompClient?.subscribe("/user/")
        },
        onStompError: (error) => console.error('STOMP Error:', error),
        onDisconnect: () => {
          console.log('Disconnected from WebSocket');
          setConnected(false);
        },
      });

      client.activate();
      setStompClient(client);

      return () => client.deactivate();
    };

    connectWebSocket();
  }
    return () => {
      if (stompClient) {
        console.log('Cleaning up WebSocket connection');
        stompClient.deactivate();
      }
    };
  }, [user]);


  const joinRoom = async (roomId: string) => {

    stompClient!.subscribe("/topic/room/"+roomId, (message) => {
      var newMessages = [...messages,message.body]
      setMessages(newMessages)
    })
  }

  const createRoom = async () => {
    stompClient!
  }



  return <GameContext.Provider value={{ room, self, joinRoom, createRoom, messages }}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
