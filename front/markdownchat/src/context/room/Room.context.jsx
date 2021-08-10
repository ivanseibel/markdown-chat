import { createContext, useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const RoomContext = createContext({});
const SOCKET_URL = 'ws://127.0.0.1:8000/ws/chat';

export const RoomProvider = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [signedUser, setSignedUser] = useState('');
  const [signedRoom, setSignedRoom] = useState('');
  const [usersList, setUserList] = useState([]);

  const onMessageHandler = useCallback((event) => {
    const { data } = event;
    const { message, username, users } = JSON.parse(data);

    console.log(data);

    const newMessageHistory = [...messageHistory, { message, username }];

    setUserList(users);
    setMessageHistory(newMessageHistory);
  }, [messageHistory])

  // Connect to the websocket server
  const { readyState, sendJsonMessage } = useWebSocket(`${SOCKET_URL}/${signedRoom}/${signedUser}`, {
    onMessage: onMessageHandler
  }, isConnected);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleSendMessage = useCallback((message) => {
    if (message.length > 0 && isConnected) {
      sendJsonMessage({
        message: message,
        username: signedUser,
        type: 'chat_message'
      });
    }
  }, [isConnected, sendJsonMessage, signedUser])

  const handleConnect = useCallback((username, room) => {
    setSignedUser(username);
    setSignedRoom(room);
    setIsConnected(!isConnected);
    setMessageHistory([]);
  }, [isConnected]);

  const roomProps = {
    handleSendMessage,
    handleConnect,
    isConnected,
    connectionStatus,
    messageHistory,
    setSignedUser,
    signedRoom,
    usersList,
    signedUser,
  };

  return (
    <RoomContext.Provider value={roomProps}>{children}</RoomContext.Provider>
  );
};
