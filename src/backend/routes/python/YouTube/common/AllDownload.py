import os
import yt_dlp
import getpass
from module.Encoding import Encoding
from common.Height import height

def AllDownload(url,Video,Audio):
    Video_height = height(Video)

    Audio_height = height(Audio)

    print(Audio_height,Video_height)

    if Video_height and Audio_height is not None:
        username = getpass.getuser()
        path = os.path.join("C:\\Users", username, "Downloads")
        try:
            ydl_opts = {
                'format': f"{str(Video_height['format_id'])},{Video_height['ext']}",
                'outtmpl': f'{path}\\%(title)s.%(ext)s',
                'quiet': True, 
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                video_info = ydl.extract_info(url, download=False)
                video_title = video_info.get('title', 'Unknown Title')
                clean_title_str = video_title.replace('|', '').replace('.', '').replace(' ', '_')
                ydl_opts['outtmpl']['default'] = f'{path}\\{clean_title_str}.%(ext)s'
                ydl.download(url)

            ydl_opts = {
                'format': f"{str(Audio_height['format_id'])},{Audio_height['ext']},{Audio_height['file_size']}",
                'outtmpl': f'{path}\\%(title)s Audio.%(ext)s',
                'quiet': True, 
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                video_info = ydl.extract_info(url, download=False)
                video_title = video_info.get('title', 'Unknown Title')
                clean_title_str = video_title.replace('|', '').replace('.', '').replace(' ', '_')
                ydl_opts['outtmpl']['default'] = f'{path}\\{clean_title_str} Audio.%(ext)s'
                ydl.download(url)
            
            title = video_info['title'].replace('|', '').replace('.', '').replace(' ', '_')
            Audioext = Audio_height['ext']
            Videoext = Video_height['ext']
            Encoding(title,Audioext,Videoext)

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
                video_info = ydl.extract_info(url, download=False)
                video_title = video_info.get('title', 'Unknown Title')
                clean_title_str = video_title.replace('|', '').replace('.', '').replace(' ', '_')
                ydl_opts['outtmpl']['default'] = f'{path}\\{clean_title_str}.%(ext)s'
                ydl.download(url)
            
            title = video_info['title'].replace('|', '').replace('.', '').replace(' ', '_')
            Audioext = Audio_height['ext']
            Encoding(title,Audioext,None)
        except Exception as e :
            print(e)
    else:
        print('Not found Audio Info')
