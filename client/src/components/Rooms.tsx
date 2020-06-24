import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';

const Rooms = () => {
  const { ws } = useSelector((state: State) => ({ ws: state.ws }));
  const [RoomsList, updateRoomsList] = useState<LoadingType<OpenObject[]>>(null);
  const [RoomName, updateRoomName] = useState('');

  const messageParser = (ev: MessageEvent) => {
    const json = JSON.parse(ev.data);
    if (json.type === 'get_rooms') {
      console.log(json);
      updateRoomsList(json.data.rooms);
    }
  }; 

  const getRooms = useCallback(() => {
    ws.send(JSON.stringify({ type: 'get_rooms' }));
  }, [ws]);

  const createRoom = () => {
    ws.send(JSON.stringify({ type: 'create_room', room_name: RoomName }));
    getRooms();
  };

  useEffect(() => {
    ws.addEventListener('open', getRooms); 
    ws.addEventListener('message', messageParser);

    return () => {
      ws.removeEventListener('open', getRooms);
      ws.removeEventListener('message', messageParser);
    }
  }, [ws, getRooms]);

  return (
    <div>
      <div>
        <input type="string" placeholder="Room Name" value={RoomName} onChange={ev => updateRoomName(ev.target.value)} />
        <button onClick={createRoom}>Create Room</button>
        <button onClick={getRooms}>Refresh</button>
      </div>
      <div>
        { RoomsList?.map(room => <p key={room.name}>{room.name}</p>) }
      </div>
    </div>
  );
}

export default Rooms;
