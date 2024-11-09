from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import torch
from torch_geometric.nn import LGConv
from torch import nn
app=FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# df_data=pd.read_csv('D:/Downloads/amazon-products2.csv')
# df_data.fillna(value="No Info",inplace=True)
# @app.get('/popular')
# def popular():
#     ratings=[]
#     for i in range(len(df_data)):
#         ratings.append(df_data.iloc[i].to_dict())
#     popular=sorted(ratings,key=lambda x:x['ratings'],reverse=True)
#     print(popular)
#     return{'popular':popular[:15]}
class LightGCN(nn.Module):
    def __init__(self, num_users, num_items, num_layers=4, dim_h=64):
        super().__init__()

        self.num_users = num_users
        self.num_items = num_items
        self.num_layers = num_layers
        self.emb_users = nn.Embedding(num_embeddings=self.num_users, embedding_dim=dim_h)
        self.emb_items = nn.Embedding(num_embeddings=self.num_items, embedding_dim=dim_h)

        self.convs = nn.ModuleList(LGConv() for _ in range(num_layers))

        nn.init.normal_(self.emb_users.weight, std=0.01)
        nn.init.normal_(self.emb_items.weight, std=0.01)

    def forward(self, edge_index):
        emb = torch.cat([self.emb_users.weight, self.emb_items.weight])
        embs = [emb]

        for conv in self.convs:
            emb = conv(x=emb, edge_index=edge_index)
            embs.append(emb)

        emb_final = 1/(self.num_layers+1) * torch.mean(torch.stack(embs, dim=1), dim=1)

        emb_users_final, emb_items_final = torch.split(emb_final, [self.num_users, self.num_items])

        return emb_users_final, self.emb_users.weight, emb_items_final, self.emb_items.weight
df_data=pd.read_csv('D:/Ecommerce/backend/GNN/res/amazon2.csv')
df_data.fillna(value="No Info",inplace=True)

df = pd.read_csv('D:/data/transaction.csv', sep=',', encoding='latin-1')
users = pd.read_csv('D:/data/Users.csv', sep=',', encoding='latin-1')
products = pd.read_csv('D:/data/Completed.csv', sep=',', encoding='latin-1', on_bad_lines='skip')
# Preprocessing
df = df.loc[df['product_id'].isin(products['Uniq Id'].unique()) & df['user_id'].isin(users['user_id'].unique())]
def get_user_items(edge_index):
    user_items = dict()
    for i in range(edge_index.shape[1]):
        user = edge_index[0][i].item()
        item = edge_index[1][i].item()
        if user not in user_items:
            user_items[user] = []
        user_items[user].append(item)
    return user_items

df = df.loc[df['product_id'].isin(products['Uniq Id'].unique()) & df['user_id'].isin(users['user_id'].unique())]
user_mapping = {userid: i for i, userid in enumerate(df['user_id'].unique())}
item_mapping = {isbn: i for i, isbn in enumerate(df['product_id'].unique())}
num_users = len(user_mapping)
num_items = len(item_mapping)
user_ids = torch.LongTensor([user_mapping[i] for i in df['user_id']])
item_ids = torch.LongTensor([item_mapping[i] for i in df['product_id']])
edge_index = torch.stack((user_ids, item_ids))
productid_title = pd.Series(products['Product Name'].values, index=products['Uniq Id']).to_dict()
productid_author = pd.Series(products['Category'].values, index=products['Uniq Id']).to_dict()
user_pos_items = get_user_items(edge_index)
model=LightGCN(num_users,num_items)

model.load_state_dict(torch.load('D:/ECommerce/backend/GNN/model.pth'))
rec_products=[]
for i in range(2500):
    recs=[]
    user = user_mapping[i+1]
    emb_user = model.emb_users.weight[user]
    ratings = model.emb_items.weight @ emb_user

    values, indices = torch.topk(ratings, k=100)

    ids = [index.cpu().item() for index in indices if index in user_pos_items[user]][:15]
    item_isbns = [list(item_mapping.keys())[list(item_mapping.values()).index(book)] for book in ids]
    titles = [productid_title[id] for id in item_isbns]
    authors = [productid_author[id] for id in item_isbns]
    ids = [index.cpu().item() for index in indices if index not in user_pos_items[user]][:15]
    item_isbns = [list(item_mapping.keys())[list(item_mapping.values()).index(book)] for book in ids]
    titles = [productid_title[id] for id in item_isbns]
    authors = [productid_author[id] for id in item_isbns]
    for title in titles:
        match=df_data[df_data['product_name']==title]
       
        if not match.empty:
            if df_data.iloc[match.index[0]].to_dict() not in rec_products:
                recs.append(df_data.iloc[match.index[0]].to_dict())
    print(i)
    rec_products.append(recs)
recs_df=pd.DataFrame({'recs':rec_products,'user_id':[i+1 for i in range(2500)]},dtype=object)
print(recs_df.head())
recs_df.to_csv("D:/Ecommerce/backend/GNN/res/recs.csv",index=False)
        