import os
import speedtest
import time

def test_speed():
    try:
        s = speedtest.Speedtest()
        s.get_best_server()
        download_speed = s.download() / 8000000
        upload_speed = s.upload() / 8000000
        ping = s.results.ping

        return download_speed, upload_speed, ping
    except Exception as e:
        print('error:', str(e))

def main():
    while True:
        download, upload, ping = test_speed()
        print('Download: {:0.2f} Mbps, Upload: {:0.2f} Mbps, Ping: {} ms'.format(download, upload, ping))
        time.sleep(2)

if __name__ == '__main__':
    main()