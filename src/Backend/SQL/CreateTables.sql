CREATE TABLE
    IF NOT EXISTS Students(
        Sid INTEGER PRIMARY KEY AUTOINCREMENT,
        'First Name' TEXT,
        'Last Name' TEXT,
        Hours INTEGER
    );

CREATE TABLE
    IF NOT EXISTS BonusHours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_date DATE NOT NULL,
        end_date DATE,
        multiplier FLOAT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS `Check Ins`(
        `index` INTEGER PRIMARY KEY,
        `First Name` TEXT,
        `Last Name` TEXT,
        `Email` TEXT,
        `Proctor` FLOAT,
        `Check In Date` DATE,
        `Check In Time` DATETIME,
        `Check Out Date` DATE,
        `Check Out Time` DATETIME,
        `Method` String(20)
    )