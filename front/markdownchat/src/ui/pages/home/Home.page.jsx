import React, { useState, useCallback, useMemo, useContext } from 'react';
import { RoomContext } from '../../../context';

export function Home() {
  // TODO: send a message saying that user just has connected
  // TODO: create interface to display messages
  // TODO: convert markdown to html
  // TODO: create environment variables to manage urls and other similar info
  // TODO: avoid duplicated username
  const { isConnected, connectionStatus, messageHistory, handleConnect } = useContext(RoomContext);
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

  const connectButtonText = useMemo(() => {
    return isConnected ? 'Leave room' : 'Enter room';
  }, [isConnected])

  return (
    <>
      <span>Socket status: {connectionStatus}</span>
      <ul>
        {messageHistory.map((item, index) => <li key={index.toString()}>{item.message}</li>)}
      </ul>
      <input
        onChange={handleOnChange}
        value={username}
        type="text"
        id="chat-username-input"
        size="39"
        autoFocus
        placeholder="username"
        disabled={isConnected}
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
      />
      <br /><br />
      <input
        type="button"
        value={connectButtonText}
        id="chat-connect"
        onClick={() => { handleConnect(username, room) }}
        disabled={username.length === 0 || room.length === 0}
      />
    </>
  );
}
