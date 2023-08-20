import os
import speedtest

def measure_speed():
    s = speedtest.Speedtest()
    s.get_best_server()
    download_speed = s.download() / 8000000
    upload_speed = s.upload() / 8000000
    ping = s.results.ping
    output = 'Download: {:0.2f} Mbps, Upload: {:0.2f} Mbps, Ping: {} ms'.format(download_speed, upload_speed, ping)
    return output