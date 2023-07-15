import os
import speedtest
import time
from measure_speed import measure_speed

def main():
    threads = []
    try:
        while True:
            try:
                output = measure_speed()
                print(output)
                time.sleep(3)
            
            except Exception as e:
                print('error:', str(e))
            
            finally:
                # 스레드 생성과 실행
                for thread in threads:
                    thread.start()

                # 모든 스레드가 정상적으로 종료되도록 대기합니다.
                for thread in threads:
                    thread.join()

                # 스레드 리스트를 비웁니다.
                threads.clear()

    except KeyboardInterrupt:
        print('Program stopped by the user.')
        return False

if __name__ == '__main__':
    main()