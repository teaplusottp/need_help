from flask import Flask, redirect, url_for, render_template, request, session, flash, jsonify
from plugin.process import del_img,process_ai,get_image_urls
from werkzeug.utils import secure_filename
from plugin.test import read_json_file
from flask_cors import CORS
from PIL import Image
import base64
import json
import os
import io

app = Flask(__name__)
cors=CORS(app, origins='*')
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

app.secret_key = 'super_secret_key'

# Configurations
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'json'}

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json().get('data', [])

    color = ""
    base64_images = []
    text = ""

    for item in data:
        if isinstance(item, str) and item.startswith('#') and len(item) == 7:
            color += item + "\n"
        elif isinstance(item, str) and item.startswith('data:image/'):
            base64_images.append(item)
        else:
            text += item + "\n"

    # Đảm bảo thư mục tồn tại trước khi ghi file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    color_file_path = os.path.join(base_dir, 'static', 'input', 'color.txt')
    text_file_path = os.path.join(base_dir, 'static', 'input', 'text.txt')
    input_folder = os.path.join(base_dir, 'static', 'input', 'img')
    output_folder = os.path.join(base_dir, 'static', 'output')

    try:
        os.makedirs(os.path.dirname(color_file_path), exist_ok=True)
        os.makedirs(input_folder, exist_ok=True)

        # Lưu nội dung vào file
        with open(color_file_path, 'w') as f:
            f.write(color)
        
        with open(text_file_path, 'w', encoding='utf-8') as f:
            f.write(text)

        del_img(input_folder)

        if base64_images:
            # Xử lý ảnh base64 nếu có
            processed_images = []
            os.makedirs(input_folder, exist_ok=True)  # Tạo thư mục nếu chưa tồn tại

            for i, base64_image in enumerate(base64_images):
                header, encoded = base64_image.split(',', 1)
                image_data = base64.b64decode(encoded)
                image = Image.open(io.BytesIO(image_data))
                # xử lý ảnh:
                grayscale_image = process_ai(image)

                output_path = os.path.join(input_folder, f'processed_image_{i}.png')
                grayscale_image.save(output_path)
                buffered = io.BytesIO()
                grayscale_image.save(buffered, format="PNG")
                processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                processed_images.append(processed_image_base64)

        return get_image_urls(output_folder)
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}, 500



@app.route('/test', methods=['GET'])
def test():
    return jsonify(
        {
            'users':[
                'name',
                'name',
                'name'
            ]
        }
    )


if __name__ == "__main__":
    # if not os.path.exists(app.config['UPLOAD_FOLDER']):
    #     os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True,port=8080)
