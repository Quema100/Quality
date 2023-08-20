import yt_dlp

def youtube_info(url):
    ydl_opts = {
        'quiet': True,
        'listformats': True,    
        }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.extract_info(url,download=False)