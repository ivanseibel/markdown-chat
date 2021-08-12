import React, { useState, useCallback, useMemo, useContext } from 'react';
import { RoomContext } from '../../../context';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

export function Home() {
  // TODO: send a message saying that user just has connected
  // TODO: create interface to display messages
  // TODO: convert markdown to html
  // TODO: create environment variables to manage urls and other similar info
  // TODO: avoid duplicated username
  const { isConnected, handleConnect } = useContext(RoomContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleOnChange = useCallback((e) => {
    switch (e.target.id) {
      case 'chat-username-input':
        setUsername(e.target.value);
        break;

      case 'chat-room-input':
        setRoom(e.target.value);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="main">
      <h1 className="login-title">Markdown Chat</h1>
      <input
        onChange={handleOnChange}
        value={username}
        type="text"
        id="chat-username-input"
        size="39"
        autoFocus
        placeholder="username"
        disabled={isConnected}
        className="fields"
      />
      <br /><br />
      <input
        onChange={handleOnChange}
        value={room}
        type="text"
        id="chat-room-input"
        size="39"
        placeholder="room"
        disabled={isConnected}
        className="fields"
      />
      <br /><br />
      <div className="enter-room-button-container">
        <input
          type="button"
          value="Enter Room"
          id="chat-connect"
          onClick={() => { handleConnect(username, room) }}
          disabled={username.length === 0 || room.length === 0}
          className="enter-room-button"
        />
        <FiLogIn className="logout-icon" size={20} />
      </div>

    </div>
  );
}
