import subprocess
import signal
import sys
import time

def app():
    server = subprocess.Popen('dotenv -f .env run uvicorn app.server:app --reload --log-level=debug', shell=True)
    client = subprocess.Popen('npm start --prefix client', shell=True)

    def signal_handler(sig, frame):
        server.terminate()
        print('Server terminated')
        client.terminate()
        print('Client terminated')
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        time.sleep(1)

def server():
    server = subprocess.Popen('dotenv -f .env run uvicorn app.server:app --reload --log-level=debug', shell=True)

    def signal_handler(sig, frame):
        server.terminate()
        print('Server terminated')
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        time.sleep(1)

def webapp():
    client = subprocess.Popen('npm start --prefix client', shell=True)

    def signal_handler(sig, frame):
        client.terminate()
        print('Client terminated')
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        time.sleep(1)
