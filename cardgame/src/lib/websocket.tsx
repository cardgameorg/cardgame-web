import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = "http://localhost:8080/ws"; 


function sendMessage(client: Stomp.Client, msg:string) {
  client.send('/app/teszt', {}, JSON.stringify({ message: msg }));
}

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [stompClient, setStompClient] = useState<any>(null);
  const socket = new SockJS(SOCKET_URL);
  const client = Stomp.over(socket);
  
  const handleSend = () => {
    sendMessage(client,input)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  useEffect(() => {
    client.connect({}, () => {
      console.log("Connected to WebSocket server");

      client.subscribe('/topic/teszteles', (message: any) => {
        console.log(message)
        const parsed = JSON.parse(message.body);
        setMessages((prevMessages: any) => [...prevMessages, parsed.message]);
      });

      client.send('/app/teszt', {}, JSON.stringify({ message: "React User" }));
    });
    // Clean up when the component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [stompClient]);


  return (
    <div>
      <h2>WebSocket Messages</h2>
      <button onClick={handleSend}>kuldj egy uzenetet</button>
      <input onChange={handleChange}></input>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
