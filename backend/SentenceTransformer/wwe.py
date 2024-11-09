import pandas as pd
import ast
from pymongo import MongoClient
df=pd.read_csv("D:/Ecommerce/backend/GNN/res/recs.csv")
df['recs'] = df['recs'].apply(ast.literal_eval)

# Convert the DataFrame to JSON format
data_json = df.to_dict(orient='records')

client = MongoClient('mongodb://localhost:27017')
db = client['test']
collection = db['recs']

# Insert the JSON data into MongoDB
collection.insert_many(data_json)

# Close the MongoDB connection
client.close()