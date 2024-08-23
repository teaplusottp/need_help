import json
import os
from flask import jsonify
import base64
from PIL import Image

def del_img(output_folder):
    for filename in os.listdir(output_folder):
        file_path = os.path.join(output_folder, filename)
        if os.path.isfile(file_path):
            try:
                os.remove(file_path)
            except PermissionError as e:
                print(f"Không thể xóa {file_path}: {e}")


def process_ai(this):
  #  this = this.convert('L')
    return this

def encode_image_to_base64(filepath):
    with open(filepath, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
def get_image_urls(output_folder):
    image_files = [f for f in os.listdir(output_folder) if os.path.isfile(os.path.join(output_folder, f))]
    image_data = []
    for filename in image_files:
        filepath = os.path.join(output_folder, filename)
        image_base64 = encode_image_to_base64(filepath)
        image_data.append({
            'filename': filename,
            'data': f'data:image/jpeg;base64,{image_base64}' 
        })
    return jsonify({'images': image_data})
