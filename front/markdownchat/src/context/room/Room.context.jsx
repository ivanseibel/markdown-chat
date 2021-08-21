import { createContext, useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const RoomContext = createContext({});

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export const RoomProvider = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [signedUser, setSignedUser] = useState('');
  const [signedRoom, setSignedRoom] = useState('');
  const [usersList, setUserList] = useState([]);

  const canConnect = useCallback(async ({ username, room }) => {
    try {
      const response = await api.get(`/get_signed_user/${room}/${username}`);
      const { user_exists } = response.data;
      return !!user_exists;
    } catch (error) {
      console.log(error.message)
      return false;
    }
  }, []);

  const onMessageHandler = useCallback((event) => {
    const { data } = event;
    const { message, username, users } = JSON.parse(data);

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

  const handleConnect = useCallback(async (username, room) => {

    if (!isConnected) {
      const isSigned = await canConnect({ username, room });
      if (!isSigned) {
        setSignedUser(username);
        setSignedRoom(room);
        setIsConnected(true);
      } else {
        alert("User is already logged in the room");
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }

    setMessageHistory([]);

  }, [isConnected, canConnect]);

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
