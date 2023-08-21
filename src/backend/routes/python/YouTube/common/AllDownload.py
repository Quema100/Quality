import os
import yt_dlp
import getpass
from module.Encoding import Encoding
from common.Height import height

def AllDownload(url,Video,Audio):
    Video_height = height(Video)

    Audio_height = height(Audio)

    #print(Video ,"\n", Audio)
    #username = getpass.getuser()
    #path = os.path.join("C:\\Users", username, "Downloads")
    #try:
        #ydl_opts = {
            #'quiet': True, 
        #}
        
        #with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            #video_info = ydl.extract_info(url, download=False)
    #except Exception as e :
       #print(e)