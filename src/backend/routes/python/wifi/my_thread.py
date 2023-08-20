from measure_speed import measure_speed
import time

def my_thread(stop_event):
    while not stop_event.is_set():
        try:
            output = measure_speed()
            print(output)
            time.sleep(3)
        except Exception as e:
            print('error:', str(e))
            
    print('Program stopped by the user.')
