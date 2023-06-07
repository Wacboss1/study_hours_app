import json
import sqlite3
import os

import pandas as pd
from flask import Flask, request, send_file
from flask_cors import CORS

from Calculate_Hours import calculate_study_hours

app = Flask(__name__)
CORS(app)
# Change to src/Backend/
backend_path = "src/Backend/"
config_file_path = backend_path + "Config.json"


def initialize_values():
    connect_to_db()
    try:
        with open(config_file_path, 'r') as config_file:
            return
    except FileNotFoundError:
        with open(config_file, 'w') as config_file:
            config_json = {
                "close time": "23:59:00",
                "filepath": None
            }
            json.dump(config_json, config_file)


def connect_to_db():
    conn = sqlite3.connect(backend_path + "SBHours.db")
    cursor = conn.cursor()
    # Change to Backend/SQL/CreateTables.sql when running from Electron
    with open(backend_path + 'SQL/CreateTables.sql', 'r') as table_script:
        cursor.executescript(table_script.read())
        conn.commit()
    return conn


with app.app_context():
    initialize_values()


@app.route("/GetStudents", methods=["GET"])
def get_students():
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT `First Name`, `Last Name`, Hours
        FROM Students
        ORDER BY `Last Name`
    """)
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    results = [dict(zip(columns, row)) for row in rows]
    return results


@app.route("/SetCloseTime", methods=["POST"])
def set_close_time():
    config_json = get_config()
    config_json['close time'] = request.get_json()['close time']
    save_config(config_json)
    return {"status": 200}


def get_config():
    with open(config_file_path, "r") as config_file:
        return json.load(config_file)


def save_config(data):
    with open(config_file_path, "w") as config_file:
        json.dump(data, config_file)


@app.route("/AddBonusHours", methods=["POST"])
def add_bonus_hours():
    connection = connect_to_db()
    request_json = request.get_json()
    # SQL statement to insert a new row into the "BonusHours" table
    query = """
    INSERT INTO BonusHours (start_date, end_date, multiplier)
    VALUES (?, ?, ?)
    """
    connection.execute(query, (request_json['startdate'], request_json['enddate'], request_json['multi']))
    connection.commit()
    connection.close()
    return {"status": 200}


@app.route("/RunHours", methods=['POST'])
def run_hours():
    connection = connect_to_db()
    if 'File' not in request.files:
        return 'No file part in the request'
    file = request.files['File']
    if file.filename == '':
        return 'No file selected'
    filepath = backend_path + file.filename
    file.save(filepath)
    close_time = get_config()["close time"]
    bonus_hours = get_bonus_hours(connection)
    out_filepath = calculate_study_hours(filepath, backend_path, close_time, bonus_hours)
    set_filepath(backend_path + out_filepath)
    add_students_to_database(connection)
    connection.close()
    os.remove(backend_path + file.filename)
    return send_file(out_filepath, as_attachment=True, download_name=out_filepath)


def get_bonus_hours(conn):
    query = """
    SELECT start_date, end_date, multiplier
    FROM BonusHours
    """
    cursor = conn.execute(query)
    rows = cursor.fetchall()

    data = []
    for row in rows:
        start_date, end_date, multiplier = row
        data.append({
            'start_date': start_date,
            'end_date': end_date,
            'multiplier': multiplier
        })
    return data


def set_filepath(filepath):
    config_json = get_config()
    config_json['filepath'] = filepath
    save_config(config_json)


def add_students_to_database(con):
    cursor = con.cursor()
    filepath = get_config()['filepath']
    students_df = pd.read_excel(filepath, engine='openpyxl')
    student_list = students_df.to_dict('records')
    for student in student_list:
        first_name = student['First Name']
        last_name = student["Last Name"]
        hours = student["Total Hours"]
        cursor.execute("SELECT COUNT(*) FROM Students WHERE `First Name`=? AND `Last Name`=?", (first_name, last_name))
        result = cursor.fetchone()
        count = result[0]
        if count == 0:
            cursor.execute("""
                INSERT INTO Students ("First Name", "Last Name", Hours) VALUES (?, ?, ?)
            """, (first_name, last_name, hours))
        if count > 0:
            cursor.execute("""
                UPDATE Students
                SET Hours = ?
                WHERE `First Name` = ? AND `Last Name` = ?
            """, (hours, first_name, last_name))
    con.commit()
    return


if __name__ == '__main__':
    app.run()
