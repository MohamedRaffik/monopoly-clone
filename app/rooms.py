from starlette.websockets import WebSocket, WebSocketState
from collections import deque
from enum import Enum

class RoomNotExist(Exception):
    pass

class RoomAlreadyExists(Exception):
    pass

class RoomMaxCapacity(Exception):
    pass

class ClientDoesNotExist(Exception):
    pass

class RoomState(Enum):
    PREGAME = 0
    INGAME = 1

class Room:
    def __init__(self):
        self.clients = deque([])
        self.state = RoomState.PREGAME

class RoomManager:
    def __init__(self):
        self.rooms = {}

    def create(self, roomName: str, client: WebSocket):
        '''
        Creates a room and joins the client into the room
        Raises an exception if the room name exists
        '''
        # Check that room does not already exist
        if self.exists(roomName):
            raise RoomAlreadyExists()
        self.rooms[roomName] = Room()
        return self.join(roomName, client)

    def broadcast(self, roomName: str, message: dict):
        '''
        Broadcasts json message to clients in the same room
        Raises an exception if the room does not exist
        '''
        if not self.exists(roomName):
            raise RoomNotExist()
        for client in self.rooms[roomName].clients:
            if client.client_state == WebSocketState.DISCONNECTED:
                self.leave(roomName, client)
            client.send_json(message)

    def join(self, roomName: str, client: WebSocket, username: str):
        '''
        Joins a client into a specified room
        Raises an exception if the room does not exist or 
        if the room is at full capacity (8 clients)
        '''
        if not self.exists(roomName):
            raise RoomNotExist()
        if len(self.rooms[roomName].clients) == 8:
            raise RoomMaxCapacity()
        self.rooms[roomName].clients.append(client)
        client.session['room'] = roomName
        client.session['username'] = username

    def leave(self, roomName: str, client: WebSocket):
        '''
        Removes a client from a room 
        Raises an exception if the room does not exist or
        if the client does not exist in the room
        '''
        if not self.exists(roomName):
            raise RoomNotExist()
        try:
            self.rooms[roomName].clients.remove(client)
        except:
            raise ClientDoesNotExist()
        if len(self.rooms[roomName].clients) == 0:
            del self.rooms[roomName]

    def exists(self, roomName: str):
        return roomName in self.rooms
