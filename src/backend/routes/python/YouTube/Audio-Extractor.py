import os
import getpass
from moviepy.editor import VideoFileClip , AudioFileClip
from module.ONLY_Audio_Downloader import ONLY_Audio_Downloader
from common.Youtube_URL import URL , is_valid_youtube_url

def main():
    try:
        while True:
            youtube_url = URL()
            if is_valid_youtube_url(youtube_url):
                ONLY_Audio_Downloader(youtube_url)
            else:
                print("Invalid YouTube URL")

    except KeyboardInterrupt:
        print("\nexit")


if __name__ == '__main__':
    main()