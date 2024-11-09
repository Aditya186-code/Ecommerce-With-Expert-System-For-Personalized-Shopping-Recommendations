import pandas as pd
from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017/')
db = client['test']
transaction = db['transaction']
user = db['users']
products = db['products']

def download():
    print("DOWNLOAAAADING)")
    pur_data = pd.DataFrame(list(transaction.find()))
    compl_data = pd.DataFrame(list(products.find()))


# Specify the path where you want to save the CSV file
    pur = 'D:/Ecommerce/backend/GNN/Python Automation/Product_Users_ratings.csv'
    compl = 'D:/Ecommerce/backend/GNN/Python Automation/Completed.csv'

# Save DataFrame to CSV file
    pur_data.to_csv(pur, index=False)
    compl_data.to_csv(compl, index=False)
