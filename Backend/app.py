import json

from flask import Flask, request, send_file
import sqlite3
import os
from Calculate_Hours import calculate_study_hours

app = Flask(__name__)


def connect_to_db():
    conn = sqlite3.connect("SBHours.db")
    cursor = conn.cursor()
    with open('SQL/CreateTables.sql', 'r') as table_script:
        cursor.executescript(table_script.read())
        conn.commit()
    return conn


@app.route("/GetStudents")
def get_students():
    return None


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
    return {"out": 200}


@app.route("/RunHours", methods=['POST'])
def run_hours():
    connection = connect_to_db()
    if 'File' not in request.files:
        return 'No file part in the request'
    file = request.files['File']
    if file.filename == '':
        return 'No file selected'
    file.save(file.filename)
    # TODO get closing time from database
    bonus_hours = get_bonus_hours(connection)
    out_filepath = calculate_study_hours(file.filename, "23:59:00", bonus_hours)
    # TODO add students from outfile to the database
    connection.close()
    return send_file(out_filepath, as_attachment=True)


def get_bonus_hours(conn):
    query = """
    SELECT start_date, end_date, multiplier
    FROM BonusHours
    """
    cursor = conn.execute(query)
    rows = cursor.fetchall()

    # Convert the rows to a list of dictionaries
    data = []
    for row in rows:
        start_date, end_date, multiplier = row
        data.append({
            'start_date': start_date,
            'end_date': end_date,
            'multiplier':  multiplier
        })

    return data


if __name__ == '__main__':
    app.run()
