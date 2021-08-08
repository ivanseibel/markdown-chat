import React, { useCallback, useState, useMemo, useRef, useContext } from 'react';
import { format } from 'date-fns';

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
    <div className="chat-room-container">
      <div className="chat-room-header-container">
        <div className="signed-room-div">
          <h3>Room: {signedRoom}</h3>
        </div>
        <div className="leave-room-div">
          <input
            type="button"
            value={connectButtonText}
            id="chat-connect"
            onClick={handleConnect}
            className="leave-room-button"
          />
        </div>
      </div>
      <div className="message-container">
        <div className="users-list-container">
          <ul>
            {usersList.map((item, index) => (
              <li className="username-list-item" key={index.toString()}>{item.username}</li>
            ))}
          </ul>
        </div>
        <div className="message-list-container">
          <ul>
            {messageHistory.map((item, index) => {
              const messageItemClass = item.username === signedUser ? "message-item right" : "message-item";
              const messageBoxClass = item.username === signedUser ? "message-box me" : "message-box";
              const time = format(new Date(), 'MM/dd/yyyy HH:mm');

              return (
                <li className={messageItemClass} key={index.toString()}>
                  <strong>{item.username}</strong>
                  <div className={messageBoxClass}>
                    <p>{item.message}</p>
                    <p className="message-time">{time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="chat-room-bottom-container" onChange={(e) => { e.preventDefault() }} >
        <div className="chat-room-message-container">
          <input
            ref={messageInputRef}
            onChange={handleOnChange}
            value={message}
            type="text"
            id="chat-message-input"
            size="39"
            placeholder="Type a message"
            onKeyDown={handleMessageInputKeyDown}
            className="chat-room-message-input"
          />
        </div>
        <div className="chat-room-send-button-container">
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
            className="send-message-button"
          />
        </div>
      </div>
    </div>
  );
}
