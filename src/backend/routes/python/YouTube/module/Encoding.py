import os
import getpass
from moviepy.editor import VideoFileClip , AudioFileClip

def Encoding():
    print("FUCKING PYTHON")
    username = getpass.getuser()
    path = os.path.join("C:\\Users", username, "Downloads")

    try:
        audio_first_stream = audio_stream_list[-1]
        audio_title = f"{yt.title} audio.mp4".replace("'", "").replace("|", "").replace("(", "").replace(")", "").replace("[", "").replace("]", "").replace('"', "").replace(" ", "_")
        audio_path = os.path.join(path, audio_title)
        audio_first_stream.download(output_path=path, filename=f"{audio_title}")
        videoclip = VideoFileClip(video_path)
        audioclip = AudioFileClip(audio_path)
        video = videoclip.set_audio(audioclip)
        video_load = os.path.join(path,title)
        video.write_videofile(video_load,codec="libx264",bitrate="60000k", audio_codec="libmp3lame", threads=8,fps=60) # If you're using .webm, the correct codec to use is 'libvpx'.

        os.remove(video_path)
        os.remove(audio_path)

        print(f"Downloaded to {video_load}.")

    except Exception as e:
        print(e)
