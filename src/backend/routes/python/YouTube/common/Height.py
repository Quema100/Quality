def height(info):
    for format_info in info:
        format_id = format_info.get('format_id', 'Unknown ID')
        ext = format_info.get('ext', 'Unknown Extension')
        resolution = format_info.get('resolution', 'Unknown Resolution')
        fps = format_info.get('fps', 'Unknown FPS')
        file_size = format_info.get('file_size', 'Unknown Filesize')
        vcodec = format_info.get('vcodec', 'Unknown Video Codec')
        vbr = format_info.get('vbr', 'Unknown Video Bitrate')
        acodec = format_info.get('acodec', 'Unknown Audio Codec')
        abr = format_info.get('abr', 'Unknown Audio Bitrate')
        audio_channels = format_info.get('audio_channels', 'Unknown Audio Channels')
        format_note = format_info.get('format_note', 'Unknown Format Note')
    #height ID
    if "none" not in vcodec and "none" in acodec:
        max_id = max(info, key=lambda x: x["format_id"])["format_id"]
        return max_id
    elif "audio only" in resolution:
        max_file_size_entry = max(info, key=lambda x: x.get("file_size", 0) if isinstance(x.get("file_size"), int) else 0)
        max_file_size_id = max_file_size_entry.get("format_id", None)
        return max_file_size_id        