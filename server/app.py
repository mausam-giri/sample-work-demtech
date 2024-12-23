from flask import Flask, jsonify, g, request
from flask_cors import CORS
import json

from db import get_db, insert_campaign, get_all_campaigns, update_campaign, delete_campaign_db

app = Flask(__name__)
CORS(app)

#
def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def load_json_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Routes
@app.route("/api/mail-template", methods=["GET"])
def getTemplate():
    try:
        templates_data = load_json_data("template.json")
        return jsonify(templates_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/user-group", methods=["GET"])
def getUserGroup():
    try:
        user_group_data = load_json_data("user_group.json")
        return jsonify(user_group_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/create-campaign', methods=['POST'])
def create_campaign():
    data = request.get_json()
  
    name = data.get('name')
    templateId = data.get('templateId')
    userGroupId = data.get('userGroupId')
    scheduleDate = data.get('scheduleDate')
    scheduleTime = data.get('scheduleTime')

    if not name or not templateId or not userGroupId or not scheduleDate or not scheduleTime:
        return jsonify({"message": "invalid data, missing fields", "success": False}), 400

    insert_campaign(name, templateId, userGroupId, scheduleDate, scheduleTime)

    return jsonify({
        "message": "campaign created",
        "success": True
    }), 201

@app.route('/api/edit-campaign/<campaignId>', methods=['POST'])
def edit_campaign(campaignId):
    data = request.get_json()
   
    name = data.get('name')
    templateId = data.get('templateId')
    userGroupId = data.get('userGroupId')
    scheduleDate = data.get('scheduleDate')
    scheduleTime = data.get('scheduleTime')

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM campaign WHERE id = ?', (campaignId,))
    campaign = cursor.fetchone()

    if not campaign:
        return jsonify({"message": "Campaign not found", "success": False}), 404

    update_campaign(campaignId, name, templateId, userGroupId, scheduleDate, scheduleTime)

    return jsonify({
        "message": "Campaign updated successfully",
        "success": True
    }), 200

@app.route('/api/delete-campaign/<int:campaignId>', methods=['POST'])
def delete_campaign(campaignId):
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM campaign WHERE id = ?', (campaignId,))
    campaign = cursor.fetchone()

    if not campaign:
        return jsonify({"message": "Campaign not found", "success": False}), 404

    delete_campaign_db(campaignId)

    return jsonify({
        "message": "Campaign deleted successfully",
        "success": True
    }), 200


@app.route('/api/get-campaigns', methods=['GET'])
def get_campaigns():
    campaigns = get_all_campaigns()
    return jsonify(campaigns), 200

# 
if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)