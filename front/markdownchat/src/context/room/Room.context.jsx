import { createContext, useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const RoomContext = createContext({});
const SOCKET_URL = 'ws://127.0.0.1:8000/ws/chat/javascript/';

export const RoomProvider = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [signedUser, setSignedUser] = useState('');

  const onMessageHandler = useCallback((event) => {
    const { data } = event;
    const { message, username, type } = JSON.parse(data);

    let messageToShow = '';

    if (type === 'chat_message') {
      messageToShow = username === signedUser
        ? `me: ${message}`
        : `${username}: ${message}`
    } else if (type === 'chat_leave_room') {
      messageToShow = message;
    }

    const newMessageHistory = [...messageHistory, { message: messageToShow, username }]
    setMessageHistory(newMessageHistory);
  }, [messageHistory, signedUser])

  // Connect to the websocket server
  const { readyState, sendJsonMessage } = useWebSocket(SOCKET_URL, {
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

  const handleConnect = useCallback(() => {
    if (isConnected) {
      sendJsonMessage({
        message: '',
        username: signedUser,
        type: 'chat_leave_room'
      })
    }
    setIsConnected(!isConnected);
    setMessageHistory([]);
  }, [isConnected, sendJsonMessage, signedUser]);

  const roomProps = {
    handleSendMessage,
    handleConnect,
    isConnected,
    connectionStatus,
    messageHistory,
    setSignedUser,
  };

  return (
    <RoomContext.Provider value={roomProps}>{children}</RoomContext.Provider>
  );
};
