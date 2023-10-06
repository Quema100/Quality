def URL():
    youtube_url = input('\033[32m'"Input YouTube URL: ")
    return youtube_url


def is_valid_youtube_url(url):
    valid_prefixes = [
        "https://www.youtube.com/watch?v=",
        "https://youtu.be/",
        "https://youtube.com/shorts",
        "https://www.youtube.com/shorts"
    ]
    for prefix in valid_prefixes:
        if url.startswith(prefix):
            return True
    return False
    