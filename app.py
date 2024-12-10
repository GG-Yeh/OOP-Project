from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# 加載環境變數
load_dotenv()

app = Flask(__name__)
CORS(app)  # 允許所有來源的跨來源請求

# 定義外部 API 的基礎 URL
BASE_URL = os.getenv("API_BASE_URL")  # 從 .env 檔案中讀取

# 根路徑，返回 index.html
@app.route('/', methods=['GET', 'HEAD'])
def serve_index():
    if request.method == 'HEAD':
        return '', 200  # HEAD 請求只需要返回標頭即可
    return send_from_directory('static', 'index.html')  # 假設 index.html 位於 static 文件夾

@app.route('/api/users', methods=['GET'])
def get_all_users():
    try:
        response = requests.get(f"{BASE_URL}/users")
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": str(http_err)}), response.status_code
    except Exception as err:
        return jsonify({"error": str(err)}), 500

@app.route('/api/users/<string:user_id>/details', methods=['GET'])
def get_user(user_id: str):
    try:
        response = requests.get(f"{BASE_URL}/users/{user_id}/details")
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": str(http_err)}), response.status_code
    except Exception as err:
        return jsonify({"error": str(err)}), 500

@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        user_data = request.json
        # Assuming BASE_URL points to an external API for adding a user
        response = requests.post(f"{BASE_URL}/users", json=user_data)
        response.raise_for_status()
        return jsonify({"message": "User added successfully!", "data": response.json()}), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": str(http_err)}), response.status_code
    except Exception as err:
        return jsonify({"error": str(err)}), 500

@app.route('/api/users/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        updated_data = request.json
        update_url = f"{BASE_URL}/users/{user_id}"
        response = requests.put(update_url, json=updated_data)
        response.raise_for_status()
        return jsonify(response.json()), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": str(http_err)}), response.status_code
    except Exception as err:
        return jsonify({"error": str(err)}), 500

@app.route('/api/users/<string:user_id>', methods=['DELETE'])
def delete_user(user_id: str):
    try:
        delete_url = f"{BASE_URL}/users/{user_id}"
        response = requests.delete(delete_url)
        response.raise_for_status()
        return jsonify({"message": "用戶刪除成功"}), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": str(http_err)}), response.status_code
    except Exception as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 10000))  # 預設埠號為 5000
    app.run(debug=True, host='0.0.0.0', port=port)
