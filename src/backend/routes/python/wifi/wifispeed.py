import os
import time
import threading
import signal
from my_thread import my_thread

def main():
    stop_event = threading.Event()

    # 스레드 생성과 실행
    thread = threading.Thread(target=my_thread, args=(stop_event,))
    thread.start()

    # Ctrl+C 시그널 핸들러 등록
    def signal_handler(sig, frame):
        stop_event.set()  # Set the event to stop the thread

    signal.signal(signal.SIGINT, signal_handler)

    try:
        # 메인 스레드가 종료되지 않도록 무한 루프를 유지합니다.
        while not stop_event.is_set():
            time.sleep(1)

        print('please wait. It will be terminated shortly...')

    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    main()
