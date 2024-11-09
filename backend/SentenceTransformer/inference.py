from sentence_transformer import SentenceTransformer,mean_pooling,my_model,tokenizer
import numpy as np
sentence_transformer=SentenceTransformer(my_model)
sentence_transformer.load_weights("D:/Sentence Transformer/sent/weights")
loaded_emb=np.load('D:/Sentence Transformer/embeddings.npz')
embedding_arr=np.array(loaded_emb['arr_0'])
embedding_arr=embedding_arr.reshape(-1,embedding_arr.shape[2])
products=np.load('D:/Sentence Transformer/product_titles.npz')

product_arr=np.array(products['arr_0'])
def get_results(wwe):
  inputs=tokenizer([wwe],max_length=64,padding='max_length',truncation=True,return_tensors='tf')
  logits=my_model(**inputs)
  out_embedding=mean_pooling(logits,inputs['attention_mask'])
  dot_p=np.matmul(embedding_arr,(np.array(out_embedding).T))
  u_mag=np.sqrt(np.sum(embedding_arr*embedding_arr,axis=-1))
  v_mag=np.sqrt(np.sum(out_embedding*out_embedding,axis=-1))

  cosine_similarity=dot_p.T/(u_mag*v_mag)
  sorted_indices=np.argsort(cosine_similarity,axis=-1)
  sorted_indices.shape
  results=[]
  for i in range(100):
      results.append(product_arr[sorted_indices[:,len(sorted_indices[0])-i-1]][0])
  new_list=list(set(results))
  return new_list
  
      
get_results("board games")