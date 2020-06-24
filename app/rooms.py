from starlette.websockets import WebSocket, WebSocketState
from collections import deque
from enum import Enum
from app.sorted_list import SortedList
from uuid import uuid4

class RoomState(Enum):
    PREGAME = 0
    INGAME = 1

class Room:
    def __init__(self, room_name: str, room_id: str):
        self.clients = deque([])
        self.state = RoomState.PREGAME
        self.name = room_name
        self.id = room_id
    
    def __eq__(self, other_room):
        return len(self.clients) == len(other_room.clients) and self.state == other_room.state

    def __ne__(self, other_room):
        return not self.__eq__(other_room)

    def __gt__(self, other_room):
        if self.state == other_room.state:
            return len(self.clients) > len(other_room.clients)
        return self.state < other_room.state

    def __lt__(self, other_room):
        return not self.__gt__(other_room)

    def __ge__(self, other_room):
        return self.__eq__(other_room) or self.__ge__(other_room)

    def __le__(self, other_room):
        return self.__eq__(other_room) or self.__lt__(other_room)

class RoomManager:
    def __init__(self):
        self.room_map: dict[str, Room] = {}
        self.rooms = SortedList()

    def create(self, room_name: str, client: WebSocket):
        '''
        Creates a room and joins the client into the room
        Raises an exception if the room name exists
        '''
        # Check that room does not already exist
        room_id = uuid4()
        if self.exists(room_id):
            raise Exception('Room Already Exists')
        self.room_map[room_id] = Room(room_name, room_id)
        self.rooms.insert(self.room_map[room_id])
        return self.join(room_id, client)

    def broadcast(self, room_id: str, message: dict):
        '''
        Broadcasts json message to clients in the same room
        Raises an exception if the room does not exist
        '''
        if not self.exists(room_id):
            raise Exception('Room does not exist')
        for client in self.room_map[room_id].clients:
            if client.client_state == WebSocketState.DISCONNECTED:
                self.leave(room_id, client)
            client.send_json(message)

    def join(self, room_id: str, client: WebSocket):
        '''
        Joins a client into a specified room
        Raises an exception if the room does not exist or 
        if the room is at full capacity (8 clients)
        '''
        if not self.exists(room_id):
            raise Exception('Room does not exist')
        if len(self.room_map[room_id].clients) == 8:
            raise Exception('Room has reached maximum capacity')
        if self.room_map[room_id].state == RoomState.INGAME:
            raise Exception('Game is in progress')

        self.room_map[room_id].clients.append(client)

    def leave(self, room_id: str, client: WebSocket):
        '''
        Removes a client from a room 
        Raises an exception if the room does not exist or
        if the client does not exist in the room
        '''
        if not self.exists(room_id):
            raise Exception('Room does not exist')
        
        try:
            self.room_map[room_id].clients.remove(client)
        except:
            pass

        if len(self.room_map[room_id].clients) == 0:
            self.rooms.remove(self.room_map[room_id])
            del self.room_map[room_id]

    def exists(self, room_id: str):
        return room_id in self.room_map
