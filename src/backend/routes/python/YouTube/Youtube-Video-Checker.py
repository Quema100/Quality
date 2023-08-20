from module.Youtube_Checker import youtube_info
from common.Youtube_URL import URL , is_valid_youtube_url

def main ():
    try:      
        while True:
            try:
                youtube_url = URL()
                if is_valid_youtube_url(youtube_url):
                    youtube_info(youtube_url)
                else:
                    print("Invalid YouTube URL")
            except Exception as e:
                print(e)

    except KeyboardInterrupt:
        print("\nexit")

if __name__ == '__main__':
    main()