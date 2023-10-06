import os
import yt_dlp

def youtube_info(url):
    os.system('cls' if os.name == 'nt' else 'clear')

    ydl_opts = {
        'quiet': True,
        'listformats': True,    
        }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.extract_info(url,download=False)