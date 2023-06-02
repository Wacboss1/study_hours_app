CREATE TABLE IF NOT EXISTS Students(
    Sid INTEGER PRIMARY KEY,
    'First Name' TEXT,
     'Last Name' TEXT,
     'Hours' INTEGER
);
CREATE TABLE IF NOT EXISTS BonusHours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    multiplier FLOAT NOT NULL
);