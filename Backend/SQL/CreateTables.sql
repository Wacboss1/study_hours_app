CREATE TABLE IF NOT EXISTS Students(
    Sid INTEGER PRIMARY KEY,
    'First Name' TEXT,
     'Last Name' TEXT
);
CREATE TABLE IF NOT EXISTS BonusHours (
    start_date DATE,
    end_date DATE,
    multiplier INTEGER,
    PRIMARY KEY(start_date, end_date)
);