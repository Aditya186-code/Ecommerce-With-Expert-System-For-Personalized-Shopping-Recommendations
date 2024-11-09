import pandas as pd
df_users=pd.read_csv("D:/UsersforId.csv")
usr_id=[]
for i in range(len(df_users)):
    usr_id.append(i+1)
    
df_users.insert(1,"usr_id",usr_id)
print(df_users.head())
df_users.to_csv("D:/newUsers.csv",index=False)