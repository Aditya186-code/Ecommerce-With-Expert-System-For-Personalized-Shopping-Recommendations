import torch
import pandas as pd
from torch_geometric.nn import LGConv
from torch import nn
from PIL import Image
import  matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from  backend.GNN.sentence_transformer import SentenceTransformer,mean_pooling,my_model,tokenizer
import numpy as np
sentence_transformer=SentenceTransformer(my_model)
sentence_transformer.load_weights('D:/Ecommerce/backend/GNN/sent/Wweights')
loaded_emb=np.load('D:/Ecommerce/backend/GNN/sent/newembeddings.npz')
embedding_arr=np.array(loaded_emb['arr_0'])
embedding_arr=embedding_arr.reshape(-1,embedding_arr.shape[2])
products=np.load('D:/Ecommerce/backend/GNN/sent/newproduct_titles.npz')
product_arr=np.array(products['arr_0'])


app=FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_data=pd.read_csv('D:/Ecommerce/backend/GNN/res/amazon2.csv')
df_data.fillna(value="No Info",inplace=True)


@app.get('/search/{key}')
def get_results(key):
  inputs=tokenizer([key],max_length=64,padding='max_length',truncation=True,return_tensors='tf')
  logits=my_model(**inputs)
  out_embedding=mean_pooling(logits,inputs['attention_mask'])
  dot_p=np.matmul(embedding_arr,(np.array(out_embedding).T))
  u_mag=np.sqrt(np.sum(embedding_arr*embedding_arr,axis=-1))
  v_mag=np.sqrt(np.sum(out_embedding*out_embedding,axis=-1))

  cosine_similarity=dot_p.T/(u_mag*v_mag)
  sorted_indices=np.argsort(cosine_similarity,axis=-1)
  
  results=[]
  dict_result=[]
  for i in range(100):
      results.append(product_arr[sorted_indices[:,len(sorted_indices[0])-i-1]][0])
  new_list=list(set(results))
  for title in new_list:
        match=df_data[df_data['product_name']==title]
       
        if df_data.iloc[match.index[0]].to_dict() not in dict_result:
            dict_result.append(df_data.iloc[match.index[0]].to_dict())
                    
  return {'result':dict_result}
  
# new_rate = pd.read_csv('D:/Ecommerce/backend/GNN/res/ratings.csv')

# p_t = new_rate.pivot_table(
#     values='rating', index='product_id', columns='user_id', fill_value=0)
# product_sparse = csr_matrix(p_t)

# nn_model = NearestNeighbors(algorithm='brute')
# nn_model.fit(product_sparse)
# products_id = p_t.index
# @app.get('/itemrecs/{p_id}')
# def item_based(p_id):
#     recs=[]
#     ids = []
#     for i in range(len(df_data['product_id'])):
#         if df_data['product_id'][i] == p_id:
#             product_id = i

#     # my_model = pickle.load(open('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/recsys/res/model.pkl', 'rb'))
#     distance, suggestion = nn_model.kneighbors(
#         p_t.iloc[product_id, :].values.reshape(1, -1), n_neighbors=5)

#     for i in suggestion[0]:
#         if df_data['product_id'][i]!=p_id:
#             ids.append(df_data.iloc[i].to_dict())
    
#     return ids
