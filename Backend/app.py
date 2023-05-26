from flask import Flask
import sqlite3

app = Flask(__name__)


def connect_to_db():
    return sqlite3.connect("SBHours.db")


@app.route("/GetStudents")
def get_students():
    return None


@app.route("/AddBonusHours")
def add_bonus_hours():
    connection = connect_to_db()
    return 200


@app.route("/RunHours")
def run_hours():
    return None


if __name__ == '__main__':
    app.run()
