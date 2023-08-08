import pandas as pd
import sqlite3

def Update_Database(connection, filepath):

    # read the excel file into a pandas dataframe
    new = pd.read_excel(filepath)
    current = pd.read_sql(
        '''
        SELECT *
        FROM 'Check Ins'
        ''',
        con=connection,
        index_col='index', 
        parse_dates=['Check In Date', 'Check In Time', 'Check Out Date', 'Check Out Time'])

    # keep old data and add new data
    current = current.append(new.iloc[len(current):])

    # make sure all check outs are up-to-date
    current['Check Out Date'] = new['Check Out Date']
    current['Check Out Time'] = new['Check Out Time']
    
    current.to_sql('Check Ins', connection, if_exists='replace')

    # commit the changes to the sqlite database
    connection.commit()
