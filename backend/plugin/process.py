import json
import os
import io
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
def save_Json(json_file_path,metadata):
    # try:
    #     with open(json_file_path, 'w', encoding='utf-8') as json_file:
    #         json.dump(metadata, json_file, ensure_ascii=False, indent=4)
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    data = json.loads(metadata)
    # Ghi dữ liệu với định dạng đẹp
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
def process_ai(text,color,img, metadata):
    return 

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
def save_Img(i,base64_image,input_folder):
    processed_images = []
    header, encoded = base64_image.split(',', 1)
    image_data = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(image_data))
    output_path = os.path.join(input_folder, f'processed_image_{i}.png')
    image.save(output_path)
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    processed_images.append(processed_image_base64)