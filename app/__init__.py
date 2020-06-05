from starlette.applications import Starlette
from starlette.websockets import WebSocket, WebSocketState, WebSocketDisconnect
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import WebSocketRoute, Route

rooms = {}

async def websocket_route(websocket: WebSocket):
    await websocket.accept()

    while True:
        try:
            message = await websocket.receive_json()
            print('Received', message)
        except WebSocketDisconnect:
            await websocket.close()
            print(websocket.client.index)
            break

async def index(request: Request):
    # USE FOR REACT CLIENT
    return JSONResponse({ 'message': 'HELLO FROM API' })

app = Starlette(routes=[
    Route(endpoint=index, path='/'),
    WebSocketRoute(endpoint=websocket_route, path='/ws')
])