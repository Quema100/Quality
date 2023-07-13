import os
import speedtest
import time

def main():
    s = speedtest.Speedtest()
    s.get_best_server()
    download_speed = s.download() / 8000000
    upload_speed = s.upload() / 8000000
    ping = s.results.ping
        
    while True:
        try:
            output = 'Download: {:0.2f} Mbps, Upload: {:0.2f} Mbps, Ping: {} ms'.format(download_speed, upload_speed, ping)
            print(output)
            time.sleep(1)
            
        except KeyboardInterrupt:
            print('Program stopped by the user.')
            break

        except Exception as e:
            print('error:', str(e))


if __name__ == '__main__':
    main()