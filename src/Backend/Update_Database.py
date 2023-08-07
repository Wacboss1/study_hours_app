import pandas as pd
import sqlite3

def Update_Database(connection, filepath):

    # read the excel file into a pandas dataframe
    df = pd.read_excel(filepath)

    # insert the dataframe into the sqlite database
    #TODO make it so old data is kept and new data is added
    df.to_sql('Check Ins', connection, if_exists='replace')

    # commit the changes to the sqlite database
    connection.commit()

