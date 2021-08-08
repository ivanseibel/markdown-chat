import React, { useCallback, useState, useMemo, useRef, useContext } from 'react';

import { RoomContext } from '../../../context';

import './styles.css';

export function Room() {
  const [message, setMessage] = useState('');
  const {
    isConnected,
    handleSendMessage,
    messageHistory,
    handleConnect,
    signedRoom,
    usersList,
    signedUser,
  } = useContext(RoomContext);
  const messageInputRef = useRef(null);

  const handleOnChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const connectButtonText = useMemo(() => {
    return isConnected ? 'Leave room' : 'Enter room';
  }, [isConnected])

  const handleMessageInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSendMessage(message);
      setMessage('');
      messageInputRef.current.focus();
    }
  }, [handleSendMessage, message])

  return (
    <>
      <span>Signed room: {signedRoom}</span><br /><br />
      <div className="message-container">
        <div className="users-list-container">
          <h4>Users</h4>
          <ul>
            {usersList.map((item, index) => (
              <li key={index.toString()}>{item.username}</li>
            ))}
          </ul>
        </div>
        <div className="message-list-container">
          <ul>
            {messageHistory.map((item, index) => {
              const messageItemClass = item.username === signedUser ? "message-item right" : "message-item";
              const messageBoxClass = item.username === signedUser ? "message-box me" : "message-box";
              return (
                <li className={messageItemClass} key={index.toString()}>
                  <span>{item.username}</span>
                  <span className={messageBoxClass}>{item.message}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <br />
      <input
        ref={messageInputRef}
        onChange={handleOnChange}
        value={message}
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
          handleSendMessage(message);
          setMessage('');
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
      />
    </>
  );
}
