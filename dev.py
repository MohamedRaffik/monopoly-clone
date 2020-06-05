import subprocess
import signal
import time
import sys

server = subprocess.Popen('uvicorn app:app --reload', shell=True)
client = subprocess.Popen('npm start --prefix client', shell=True)
        
def signal_handler(sig, frame):
    server.terminate()
    print('Server Terminated')
    client.terminate()
    print('Client Terminated')
    sys.exit(1)

signal.signal(signal.SIGINT, signal_handler)

while True:
    time.sleep(1)