import os
import speedtest
import time
from measure_speed import measure_speed

def main():
    while True:
        try:
            output = measure_speed()
            print(output)
            time.sleep(3)
        
        except KeyboardInterrupt:
            print('Program stopped by the user.')
            break
        
        except Exception as e:
            print('error:', str(e))

if __name__ == '__main__':
    main()