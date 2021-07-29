import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const SOCKET_URL = 'ws://127.0.0.1:8000/ws/chat/javascript/';

function App() {
  // TODO: send a message saying that user just has connected
  // TODO: create interface to display messages
  // TODO: convert markdown to html
  // TODO: create environment variables to manage urls and other similar info
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageFormData, setMessageFormData] = useState({ username: '', message: '' });
  const [isConnected, setIsConnected] = useState(false);

  const messageInputRef = useRef(null);

  const onMessageHandler = useCallback((event) => {
    const { data } = event;
    const { message, username, type } = JSON.parse(data);

    let messageToShow = '';

    if (type === 'chat_message') {
      messageToShow = username === messageFormData.username
        ? `me: ${message}`
        : `${username}: ${message}`
    } else if (type === 'chat_leave_room') {
      messageToShow = message;
    }

    const newMessageHistory = [...messageHistory, { message: messageToShow, username }]
    setMessageHistory(newMessageHistory);
  }, [messageFormData, messageHistory])

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

  const isFormDataValid = useMemo(() => {
    return messageFormData.message.length > 0 && messageFormData.message.length > 0;
  }, [messageFormData]);

  const handleSendMessage = useCallback(() => {
    if (isFormDataValid && isConnected) {
      sendJsonMessage({
        message: messageFormData.message,
        username: messageFormData.username,
        type: 'chat_message'
      });

      setMessageFormData(state => ({ message: '', username: state.username }));
      messageInputRef.current.focus();
    }
  }, [isConnected, isFormDataValid, messageFormData, sendJsonMessage])

  const handleOnChange = useCallback((e) => {
    setMessageFormData({
      username: e.target.id === "chat-username-input"
        ? e.target.value
        : messageFormData.username,
      message: e.target.id === "chat-message-input"
        ? e.target.value
        : messageFormData.message,
    });
  }, [messageFormData]);

  const handleConnect = useCallback(() => {
    if (isConnected) {
      sendJsonMessage({
        message: '',
        username: messageFormData.username,
        type: 'chat_leave_room'
      })
    }
    setIsConnected(!isConnected);
    setMessageHistory([]);
  }, [isConnected, messageFormData.username, sendJsonMessage]);

  const connectButtonText = useMemo(() => {
    return isConnected ? 'Leave room' : 'Enter room';
  }, [isConnected])

  const handleMessageInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage])

  return (
    <>
      <span>Socket status: {connectionStatus}</span>
      <ul>
        {messageHistory.map((item, index) => <li key={index.toString()}>{item.message}</li>)}
      </ul>
      <input
        onChange={handleOnChange}
        value={messageFormData.username}
        type="text"
        id="chat-username-input"
        size="39"
        autoFocus
        placeholder="username"
        disabled={isConnected}
      />
      <br /><br />
      <input
        ref={messageInputRef}
        onChange={handleOnChange}
        value={messageFormData.message}
        type="text"
        id="chat-message-input"
        size="39"
        placeholder="message"
        onKeyDown={handleMessageInputKeyDown}
      />
      <br /><br />
      <input
        type="button"
        value="Send message"
        id="chat-message-submit"
        onClick={handleSendMessage}
        disabled={!isConnected}
      />
      <br /><br /><br />
      <input
        type="button"
        value={connectButtonText}
        id="chat-connect"
        onClick={handleConnect}
        disabled={messageFormData.username.length === 0}
      />
    </>
  );
}

export default App;
