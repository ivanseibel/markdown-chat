import React, { useState, useCallback, useMemo, useRef, useContext } from 'react';
import { RoomContext } from '../../../context';

export function Home() {
  // TODO: send a message saying that user just has connected
  // TODO: create interface to display messages
  // TODO: convert markdown to html
  // TODO: create environment variables to manage urls and other similar info
  const { isConnected, handleSendMessage, connectionStatus, messageHistory, handleConnect } = useContext(RoomContext);
  const [messageFormData, setMessageFormData] = useState({ username: '', message: '' });
  const messageInputRef = useRef(null);

  // const isFormDataValid = useMemo(() => {
  //   return messageFormData.message.length > 0 && messageFormData.message.length > 0;
  // }, [messageFormData]);

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
        onClick={() => {
          handleSendMessage(messageFormData.message);
          setMessageFormData(state => ({ message: '', username: state.username }));
          messageInputRef.current.focus();
        }}
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
