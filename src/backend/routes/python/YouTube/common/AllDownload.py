import os
import yt_dlp
import getpass
from module.Encoding import Encoding
from common.Height import height

def AllDownload(url,Video,Audio):
    Video_height = height(Video)

    Audio_height = height(Audio)

    print(Audio_height,Video_height)

    if Video_height or Audio_height is not None:
        username = getpass.getuser()
        path = os.path.join("C:\\Users", username, "Downloads")
        try:
            ydl_opts = {
                'format': f"{str(Video_height['format_id'])},{Video_height['ext']}",
                'outtmpl': f'{path}\\%(title)s.%(ext)s',
                'quiet': True, 
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download(url)

            ydl_opts = {
                'format': f"{str(Audio_height['format_id'])},{Audio_height['ext']},{Audio_height['file_size']}",
                'outtmpl': f'{path}\\%(title)s Audio.%(ext)s',
                'quiet': True, 
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download(url)

        except Exception as e :
            print(e)
    elif Video_height is None and Audio_height is not None:
        username = getpass.getuser()
        path = os.path.join("C:\\Users", username, "Downloads")
        try:

            ydl_opts = {
                'format': f"{str(Audio_height['format_id'])},{Audio_height['ext']},{Audio_height['file_size']}",
                'outtmpl': f'{path}\\%(title)s.%(ext)s',
                'quiet': True, 
            }
                
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download(url)
        except Exception as e :
            print(e)
    else:
        print('Not found Audio Info')
