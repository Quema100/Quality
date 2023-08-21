def height(info):
    max_id = max(info, key=lambda x: x["format_id"])["format_id"]
    print("가장 큰 id:", max_id)
    print(info)
    print('hello world')