import os
import speedtest
import time
import asyncio

async def measure_speed():
    loop = asyncio.get_event_loop()
    s = speedtest.Speedtest()
    await loop.run_in_executor(None, s.get_best_server)
    
    def calculate_download_speed():
        return s.download() / 8000000
    
    def calculate_upload_speed():
        return s.upload() / 8000000
    
    download_speed = await loop.run_in_executor(None, calculate_download_speed)
    upload_speed = await loop.run_in_executor(None, calculate_upload_speed)
    ping = await loop.run_in_executor(None, lambda: s.results.ping)
    
    output = 'Download: {:0.2f} Mbps, Upload: {:0.2f} Mbps, Ping: {} ms'.format(download_speed, upload_speed, ping)
    return output

async def main():
    while True:
        try:
            output = await measure_speed()
            print(output)
            await asyncio.sleep(3)
        
        except KeyboardInterrupt:
            print('exit')
            break
        
        except Exception as e:
            print('error:', str(e))

if __name__ == '__main__':
    asyncio.run(main())