from starlette.websockets import WebSocket
from app.rooms import RoomManager
import traceback

RoomManager = RoomManager()

class MessageHandler:
    def __init__(self, client: WebSocket):
        self.client = client

    async def handle(self):
        await self.client.accept()
        await self.event_loop()
        await self.client.close()
                
    async def event_loop(self):
        try:
            while True:
                message = await self.client.receive_json()
                if 'type' not in message:
                    await self.client.send_json({ 'status': 'failed', 'info': 'Message type was not defined' })
                message_type = message['type'].lower().replace(' ', '_')
                handler = self.__getattribute__(f'{message_type}_handler')
                print(message, handler)
                if not handler:
                    continue
                try:
                    await handler(message)
                except Exception as e:
                    print(e)
                    await self.client.send_json({ 'status': 'failed', 'info': 'Failed to handle message' })
        except:
            pass    

    async def create_room_handler(self, message: dict):
        room_name = message['room_name']
        RoomManager.create(room_name, self.client)
        await self.client.send_json({ 'status': 'success' })

    async def join_room_handler(self, message: dict):
        room_name = message['room_name']
        RoomManager.join(room_name, self.client)

    async def get_rooms_handler(self, message: dict):
        await self.client.send_json({ 
            'type': 'get_rooms',
            'status': 'success', 
            'data': { 
                'number_of_rooms': RoomManager.rooms.length,
                'rooms': [ { 'name': room.name, 'clients': len(room.clients), 'state': 'In Progress' if room.state else 'Looking for players' } for room in RoomManager.rooms.slice(0, 20) ]
            }
        })