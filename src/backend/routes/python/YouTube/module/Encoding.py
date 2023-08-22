import os
import getpass
from moviepy.editor import VideoFileClip , AudioFileClip

def Encoding(title,Audioext,Videoext):
    print("FUCKING PYTHON")
    username = getpass.getuser()
    path = os.path.join("C:\\Users", username, "Downloads")

    try:
        if Audioext and Videoext is not None:
            fin_title = f"{title} fin.avi"
            video_title = f"{title}.{Videoext}"
            audio_title = f"{title} Audio.{Audioext}"
            video_path = os.path.join(path, video_title)
            audio_path = os.path.join(path, audio_title)
            videoclip = VideoFileClip(video_path)
            audioclip = AudioFileClip(audio_path)
            video = videoclip.set_audio(audioclip)
            video_load = os.path.join(path,fin_title)
            # If you're using .webm, the correct codec to use is 'libvpx'.
            # If you're using .mp4, the correct codec to use is 'libx264'.
            video.write_videofile(video_load,codec="rawvideo",bitrate="60000k", audio_codec="pcm_s32le",threads=8,fps=60,ffmpeg_params=['-vf','scale=3840x2160'])


            os.remove(video_path)
            os.remove(audio_path)

            print(f"Downloaded to {video_load}.")
        elif Videoext is None and Audioext is not None:
            fin_title = f"{title}.wav"
            audio_title = f"{title}.{Audioext}"
            audio_path = os.path.join(path, audio_title)
            audioclip = AudioFileClip(audio_path)
            audio_load = os.path.join(path,fin_title)
            audioclip.write_audiofile(audio_load,nbytes=4,codec='pcm_s32le')

            os.remove(audio_path)

            print(f"Downloaded to {audio_load}.")
            
    except Exception as e:
        print(e)
