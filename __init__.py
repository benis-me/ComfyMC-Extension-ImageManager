import os
import time
import server
import folder_paths
from aiohttp import web

this_dir = os.path.dirname(os.path.abspath(__file__))
comfy_dir = folder_paths.base_path

# 获取图片
@server.PromptServer.instance.routes.get('/image-manager/get-images')
async def get_images(request):
    search = request.rel_url.query.get('search', '')
    output_dir = folder_paths.get_output_directory()

    image_files = []
    for root, dirs, files in os.walk(output_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                image_files.append(os.path.join(root, file))

    if search:
        image_files = [file for file in image_files if search.lower() in file.lower()]

    image_files.sort(key=lambda x: os.path.getctime(x), reverse=True)
    image_files = [{
        'name': os.path.basename(file),
        'path': file,
        'size': os.path.getsize(file),
        'subfolder': os.path.relpath(os.path.dirname(file), output_dir),
        'created':  time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getctime(file)))
    } for file in image_files]

    return web.json_response({ 'images': image_files })

# 删除指定图片
@server.PromptServer.instance.routes.post('/image-manager/delete-image')
async def delete_image(request):
    filename = await request.json()
    output_dir = folder_paths.get_output_directory()
    if os.path.exists(output_dir):
        image_path = os.path.join(output_dir, filename)
        if os.path.exists(image_path):
            os.unlink(image_path)
            return web.json_response({ 'success': True })
    return web.json_response({ 'success': False })

#-----------------------------------------------------------------------------------------------------------------------
# 导入 js 到 'ComfyUI\web\extensions'
import shutil

source_dir = os.path.join(this_dir, 'js')
destination_dir = os.path.join(comfy_dir, 'web', 'extensions', 'image-manager')

os.makedirs(destination_dir, exist_ok=True)

source_files = [f for f in os.listdir(source_dir) if f.endswith('.js')]

for file_name in os.listdir(destination_dir):
    if file_name not in source_files and file_name.endswith('.js'):
        file_path = os.path.join(destination_dir, file_name)
        os.unlink(file_path)

for file_name in source_files:
    source_path = os.path.join(source_dir, file_name)
    destination_path = os.path.join(destination_dir, file_name)
    shutil.copy2(source_path, destination_path)

#-----------------------------------------------------------------------------------------------------------------------
NODE_CLASS_MAPPINGS = {}
__all__ = ['NODE_CLASS_MAPPINGS']