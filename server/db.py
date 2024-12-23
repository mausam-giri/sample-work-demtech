from flask import g
import sqlite3

DATABASE = "demtech.db"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def insert_campaign(name, templateId, userGroupId, schedule_date, schedule_time):
    db = get_db()
    cursor = db.cursor()

    cursor.execute('''
    INSERT INTO campaign (name, templateId, userGroupId, scheduleDate, scheduleTime)
    VALUES (?, ?, ?, ?, ?)
    ''', (name, templateId, userGroupId, schedule_date, schedule_time))

    db.commit()

def get_all_campaigns():
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT id, name, templateId, userGroupId, scheduleDate, scheduleTime FROM campaign')
    campaigns = cursor.fetchall()

    result = []
    for campaign in campaigns:
        result.append({
            "id": campaign[0],
            "name": campaign[1],
            "templateId": campaign[2],
            "userGroupId": campaign[3],
            "scheduleDate": campaign[4],
            "scheduleTime": campaign[5]
        })

    return result

def update_campaign(campaignId, name, templateId, userGroupId, schedule_date, schedule_time):
    db = get_db()
    cursor = db.cursor()

    cursor.execute('''
    UPDATE campaign
    SET name = ?, templateId = ?, userGroupId = ?, scheduleDate = ?, scheduleTime = ?
    WHERE id = ?
    ''', (name, templateId, userGroupId, schedule_date, schedule_time, campaignId))

    db.commit()

def delete_campaign_db(campaignId):
    db = get_db()
    cursor = db.cursor()

    # Perform the delete operation
    cursor.execute('''
    DELETE FROM campaign
    WHERE id = ?
    ''', (campaignId,))

    db.commit()