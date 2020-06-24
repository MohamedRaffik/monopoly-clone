from starlette.applications import Starlette
from starlette.websockets import WebSocket, WebSocketState, WebSocketDisconnect
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import WebSocketRoute, Route
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from app.msghandler import MessageHandler
import os

async def websocket_route(websocket: WebSocket):
    messageHandler = MessageHandler(websocket)
    await messageHandler.handle()

async def index(request: Request):
    # USE FOR REACT CLIENT
    return JSONResponse({ 'message': 'HELLO FROM API' })

def create_app():
    return Starlette(
        routes=[
            Route(endpoint=index, path='/', methods=['GET']),
            WebSocketRoute(endpoint=websocket_route, path='/game')
        ],
        middleware=[
            Middleware(SessionMiddleware, secret_key='testingsecretkey')
        ]
    )