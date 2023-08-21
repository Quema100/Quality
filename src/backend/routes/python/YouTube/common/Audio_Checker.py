def Audio_Checker(format_infos):
    audio_only_formats = []

    for format_info in format_infos:
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
        stretched_ratio = format_info.get('stretched_ratio', 'Unknown Stretched Ratio')
        format_note = format_info.get('format_note', 'Unknown Format Note')
        F = format_info.get('format', 'Unknown Format')
        language = format_info.get('language', 'Unknown Language')
        protocol = format_info.get('protocol', 'Unknown Protocol')
        if "audio only" in resolution:
            info = {
                'format_id': int(format_id),
                'ext': ext,
                'resolution': resolution,
                'fps': fps,
                'file_size': file_size,
                'vcodec': vcodec,
                'vbr': vbr,
                'acodec': acodec,
                'abr': abr,
                'audio_channels': audio_channels,
                'stretched_ratio': stretched_ratio,
                'format_note': format_note,
                'format': F,
                'language': language,
                'protocol': protocol
            }

            audio_only_formats.append(info)
        
    
    return audio_only_formats