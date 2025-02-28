import { Client } from "stompjs";
import SockJS from "sockjs-client";
import { createContext } from "react";
import { useContext } from "react";

interface WebSocketContextType {
  
}

const GameContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {







  return (
    <GameContextProvider.Provider
      value={{ messages, sendMessage, subscribeToTopic }}
    >
      {children}
    </GameContextProvider.Provider>
  );
};

export const useGameContext = (): WebSocketContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
