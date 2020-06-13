from starlette.websockets import WebSocket
from app.rooms import RoomManager

Rooms = RoomManager()

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
                message_type = message['type'].lower().replace(' ', '_')
                handler = self.__getattribute__(f'{message_type}_handler')
                if not handler:
                    continue
                await handler()
        except:
            pass    

    async def get_existing_room_handler(self):
        room = self.client.session.get('room', None)
        username = self.client.session.get('user', None)
        await self.client.send_json({ 'type': 'GET EXISTING ROOM', 'room': room, 'username': username })
        
    async def join_room_handler(self, message: dict):
        pass