import torch
from torch_geometric.nn import LGConv
from torch import nn,optim
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from torch_geometric.utils import structured_negative_sampling
K = 20
LAMBDA = 1e-6
BATCH_SIZE = 1024
n_batch=50
df = pd.read_csv('D:/Ecommerce/backend/GNN/Python Automation/Product_Users_ratings.csv')
users = pd.read_csv('D:/Ecommerce/backend/GNN/Python Automation/Users.csv')
products = pd.read_csv('D:/Ecommerce/backend/GNN/Python Automation/Completed.csv')
# Preprocessing
df = df.loc[df['product_id'].isin(products['product_id'].unique()) & df['user_id'].isin(users['user_id'].unique())]
user_mapping = {userid: i for i, userid in enumerate(df['user_id'].unique())}
item_mapping = {isbn: i for i, isbn in enumerate(df['product_id'].unique())}

# Count users and items
num_users = len(user_mapping)
num_items = len(item_mapping)
num_total = num_users + num_items
user_ids = torch.LongTensor([user_mapping[i] for i in df['user_id']])
item_ids = torch.LongTensor([item_mapping[i] for i in df['product_id']])
edge_index = torch.stack((user_ids, item_ids))
train_index, test_index = train_test_split(range(len(df)), test_size=0.2, random_state=0)
val_index, test_index = train_test_split(test_index, test_size=0.5, random_state=0)

train_edge_index = edge_index[:, train_index]
val_edge_index = edge_index[:, val_index]
test_edge_index = edge_index[:, test_index]
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
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = LightGCN(num_users, num_items)
model = model.to(device)
edge_index = edge_index.to(device)
train_edge_index = train_edge_index.to(device)
val_edge_index = val_edge_index.to(device)
optimizer = optim.Adam(model.parameters(), lr=0.0001)
model.load_state_dict(torch.load("D:/Ecommerce/backend/GNN/Python Automation/model.pth"))
def sample_mini_batch(edge_index):
    # Generate BATCH_SIZE random indices
    index = np.random.choice(range(edge_index.shape[1]), size=BATCH_SIZE)

    # Generate negative sample indices
    edge_index = structured_negative_sampling(edge_index)
    edge_index = torch.stack(edge_index, dim=0)

    user_index = edge_index[0, index]
    pos_item_index = edge_index[1, index]
    neg_item_index = edge_index[2, index]

    return user_index, pos_item_index, neg_item_index
def bpr_loss(emb_users_final, emb_users, emb_pos_items_final, emb_pos_items, emb_neg_items_final, emb_neg_items):
    reg_loss = LAMBDA * (emb_users.norm().pow(2) +
                        emb_pos_items.norm().pow(2) +
                        emb_neg_items.norm().pow(2))

    pos_ratings = torch.mul(emb_users_final, emb_pos_items_final).sum(dim=-1)
    neg_ratings = torch.mul(emb_users_final, emb_neg_items_final).sum(dim=-1)

    bpr_loss = torch.mean(torch.nn.functional.softplus(pos_ratings - neg_ratings))
    # bpr_loss = torch.mean(torch.nn.functional.logsigmoid(pos_ratings - neg_ratings))

    return -bpr_loss + reg_loss

def train():
    for epoch in range(80):
        print(epoch)
        model.train()

        for _ in range(n_batch):
            optimizer.zero_grad()

            emb_users_final, emb_users, emb_items_final, emb_items = model.forward(train_edge_index)

            user_indices, pos_item_indices, neg_item_indices = sample_mini_batch(train_edge_index)

            emb_users_final, emb_users = emb_users_final[user_indices], emb_users[user_indices]
            emb_pos_items_final, emb_pos_items = emb_items_final[pos_item_indices], emb_items[pos_item_indices]
            emb_neg_items_final, emb_neg_items = emb_items_final[neg_item_indices], emb_items[neg_item_indices]

            tran_loss = bpr_loss(emb_users_final, emb_users, emb_pos_items_final, emb_pos_items, emb_neg_items_final, emb_neg_items)

            tran_loss.backward()
            optimizer.step()

        if epoch % 10 == 0:
            model.eval()
train()
torch.save(model.state_dict(),"D:/Ecommerce/backend/GNN/Python Automation/model.pth")
        