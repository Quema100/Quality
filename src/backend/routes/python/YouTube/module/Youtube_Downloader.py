import os
import yt_dlp
from common.Audio_Checker import Audio_Checker 
from common.AllDownload import AllDownload
from module.Video_Checker import Video_Checker

def youtube_info(url):
    os.system('cls' if os.name == 'nt' else 'clear')
    
    ydl_opts = {
        'quiet': True, 
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        video_info = ydl.extract_info(url, download=False)
    
    format_infos = []

    for format_info in video_info.get('formats', []):
        format_id = format_info.get('format_id', 'Unknown ID')
        ext = format_info.get('ext', 'Unknown Extension')
        resolution = format_info.get('resolution', 'Unknown Resolution')
        fps = format_info.get('fps', 'Unknown FPS')
        file_size = format_info.get('filesize', 'Unknown Filesize')
        vcodec = format_info.get('vcodec', 'Unknown Video Codec')
        vbr = format_info.get('vbr', 'Unknown Video Bitrate')
        acodec = format_info.get('acodec', 'Unknown Audio Codec')
        abr = format_info.get('abr', 'Unknown Audio Bitrate')
        audio_channels = format_info.get('audio_channels', 'Unknown Audio Channels')
        format_note = format_info.get('format_note', 'Unknown Format Note')
        F = format_info.get('format', 'Unknown Format')
        language = format_info.get('language', 'Unknown Language')
        protocol = format_info.get('protocol', 'Unknown Protocol')
        
        format_info_dict = {
            'format_id': format_id,
            'ext': ext,
            'resolution': resolution,
            'fps': fps,
            'file_size': file_size,
            'vcodec': vcodec,
            'vbr': vbr,
            'acodec': acodec,
            'abr': abr,
            'audio_channels': audio_channels,
            'format_note': format_note,
            'format': F,
            'language': language,
            'protocol': protocol
        }        

        format_infos.append(format_info_dict)

        
    Audio = Audio_Checker(format_infos)

    Video = Video_Checker(format_infos)

    download = AllDownload(url,Video,Audio)
