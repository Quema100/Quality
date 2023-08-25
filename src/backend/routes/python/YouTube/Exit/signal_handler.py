import sys

def signal_handler(signal, frame):
    print("\nExiting...")
    sys.exit(0)