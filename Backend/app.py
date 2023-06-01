from flask import Flask
import sqlite3
from Calculate_Hours import calculate_study_hours

app = Flask(__name__)

def connect_to_db():
    conn = sqlite3.connect("SBHours.db")
    cursor = conn.cursor()
    with open('C:\\Users\\William Clemmons Jr\\WebstormProjects\\electron_test\\Backend\\SQL\\CreateTables.sql', 'r') as table_script:
        cursor.executescript(table_script.read())
        conn.commit()
    return conn


@app.route("/GetStudents")
def get_students():
    return None


@app.route("/AddBonusHours")
def add_bonus_hours():
    connection = connect_to_db()
    return 200


@app.route("/RunHours")
def run_hours():
    connection = connect_to_db()

    connection.close()
    return None


if __name__ == '__main__':
    app.run()
