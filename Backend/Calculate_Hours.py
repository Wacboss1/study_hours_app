# TODO document for use
import time
from datetime import timedelta
import pandas as pd

pd.options.mode.chained_assignment = None


def get_all_hours(doc):
    full_hours = pd.read_excel(doc)
    full_hours = full_hours.sort_values(by=["Last Name", "First Name"])
    return full_hours


def filter_valid_hours(full_hours):
    valid_hours = full_hours
    valid_hours = valid_hours[valid_hours['Check In Time'].dt.dayofyear == valid_hours['Check Out Time'].dt.dayofyear]
    valid_hours = valid_hours[full_hours['Check Out Time'].dt.time <= closing_time]
    return valid_hours


def add_needed_columns(valid_hours, bonus_hours_list):
    # TODO format the weeks to start from week 1
    valid_hours["Week"] = valid_hours["Check In Time"].dt.isocalendar().week
    valid_hours["Minutes Gained"] = valid_hours["Check Out Time"] - valid_hours["Check In Time"]
    calculate_bonus_hours(valid_hours, bonus_hours_list)
    return valid_hours

def calculate_bonus_hours(valid_hours, bonus_hours):
    multipliers = valid_hours['Check In Date'].apply(lambda x: get_multiplier(x, bonus_hours))
    valid_hours['Minutes Gained'] = valid_hours['Minutes Gained'] * multipliers.apply(float)


def get_multiplier(x, bonus_hours):
    return next((item for item in bonus_hours if is_between_dates(item['Start Date'], item['End Date'], x)),
                {'Multiplier': 1})['Multiplier']


def is_between_dates(start_date, end_date, date):
    if start_date <= date.date() <= end_date:
        return True
    return False


def timedelta_to_minutes(x):
    return x / timedelta(minutes=1)


def timedelta_to_hours(x):
    #TODO give hours and minutes from total hours
    return round(x / timedelta(hours=1), 2)


def calculate_study_hours():
    global closing_time
    # TODO get data from database
    closing_time = pd.to_datetime(input_data.start_time).time()
    all_hours = get_all_hours(input_data.file_path)
    valid_hours = filter_valid_hours(all_hours)
    valid_hours = add_needed_columns(valid_hours, input_data.bonus_hours)
    summary_page = pd.DataFrame(columns=['Last Name', 'First Name', 'Total Hours']);
    names = all_hours.drop_duplicates(subset=['First Name', 'Last Name'])[['First Name', 'Last Name']].values
    writer = pd.ExcelWriter("Study Hours " + time.strftime("%b %d %Y", time.localtime()) + ".xlsx", engine="openpyxl")
    summary_page.to_excel(writer, sheet_name=time.strftime("%b %d %Y", time.localtime()), index=False)
    for person in names:
        person_hours = valid_hours[(valid_hours['First Name'] == person[0]) & (valid_hours['Last Name'] == person[1])]
        person_hours["Total Hours"] = person_hours["Minutes Gained"].cumsum()
        person_hours["Total Hours"] = person_hours["Total Hours"].apply(timedelta_to_hours)
        person_hours["Minutes Gained"] = person_hours["Minutes Gained"].apply(timedelta_to_minutes)
        try:
            summary_page.loc[len(summary_page.index)] = [person[1], person[0], person_hours['Total Hours'].iloc[-1]]
        except:
            summary_page.loc[len(summary_page.index)] = [person[1], person[0], 0]
        person_hours.to_excel(writer, sheet_name=person[1] + ", " + person[0], index=False)
    summary_page.to_excel(writer, sheet_name=time.strftime("%b %d %Y", time.localtime()), index=False)
    writer.close()


""" 
get rid of all entries with hours after the closing time
for each person calculate the total hours they been clocked in
create and xlsx of that list
    First Name, Last Name, Total Hours
"""

# hours worked: 26 + 1