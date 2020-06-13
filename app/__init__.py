from starlette.applications import Starlette
from starlette.websockets import WebSocket, WebSocketState, WebSocketDisconnect
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import WebSocketRoute, Route
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from app.msghandler import MessageHandler
from google.cloud import pubsub_v1
from google.api_core.exceptions import NotFound
import os

async def websocket_route(websocket: WebSocket):
    messageHandler = MessageHandler(websocket)
    await messageHandler.handle()

async def index(request: Request):
    # USE FOR REACT CLIENT
    return JSONResponse({ 'message': 'HELLO FROM API' })

def create_app():

    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(os.environ.get('PUBSUB_PROJECT_ID'), 'mc-rooms')

    try:
        publisher.get_topic(topic_path)
    except NotFound:
        publisher.create_topic(topic_path)
    finally:
        print('ROOMS TOPIC CREATED')

    return Starlette(
        routes=[
            Route(endpoint=index, path='/', methods=['GET']),
            WebSocketRoute(endpoint=websocket_route, path='/game')
        ],
        middleware=[
            Middleware(SessionMiddleware, secret_key='testingsecretkey')
        ]
    )