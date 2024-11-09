import tensorflow as tf
import keras
import  numpy as np
from keras.models import Model
from transformers import AutoTokenizer,create_optimizer,TFAutoModel
model_id='sentence-transformers/multi-qa-MiniLM-L6-cos-v1'
my_model=TFAutoModel.from_pretrained(model_id)

tokenizer=AutoTokenizer.from_pretrained(model_id)
class SentenceTransformer(Model):
    def __init__(self,model):
     super(SentenceTransformer,self).__init__()
     self.model=model
     self.dense1=keras.layers.Dense(1,activation='sigmoid')
     
    def compile(self,optimizer,loss):
        super(SentenceTransformer,self).compile()
        self.loss=loss
        self.optimizer=optimizer
        self.loss_metric=keras.metrics.Mean(name='loss')
        
    @property
    def metrics(self):
        return [self.loss_metric]
    
    def mean_pooling(self,model_output,attention_mask):
        token_embeddings=model_output[0]
        input_mask_expanded=tf.cast(tf.broadcast_to(tf.expand_dims(attention_mask,axis=-1),tf.shape(token_embeddings)),tf.float32)
        print(token_embeddings.shape)
        print(input_mask_expanded.shape)
        return tf.math.reduce_sum(token_embeddings*input_mask_expanded,axis=1)/tf.clip_by_value(tf.math.reduce_sum(input_mask_expanded,axis=1),1e-9,tf.float32.max)
    
    
    def train_step(self,train_data):
        query={'input_ids':train_data['input_ids_query'][:,0,:],
               'token_type_ids':train_data['token_type_ids_query'][:,0,:],
               'attention_mask':train_data['attention_mask_query'][:,0,:]}
        
        product={'input_ids':train_data['input_ids_product'][:,0,:],
               'token_type_ids':train_data['token_type_ids_product'][:,0,:],
               'attention_mask':train_data['attention_mask_product'][:,0,:]}
        labels=train_data['label']
        with tf.GradientTape() as recorder:
            query_pred=self.model(query)
            pred_query=self.mean_pooling(query_pred,train_data['attention_mask_query'][:,0,:])
            product_pred=self.model(product)
            pred_prod=self.mean_pooling(product_pred,train_data['attention_mask_product'][:,0,:])
            pred_concat=tf.concat([pred_query,pred_prod,tf.abs(pred_query-pred_prod)],axis=-1)
            pred=self.dense1(pred_concat)
            loss=self.loss(labels,pred)
        partial_derivatives=recorder.gradient(loss,self.model.trainable_weights)
        self.optimizer.apply_gradients(zip(partial_derivatives,self.model.trainable_weights))
        self.loss_metric.update_state(loss)
        return {'loss':self.loss_metric.result(),}
    
   


def mean_pooling(model_output,attention_mask):
        token_embeddings=model_output[0]
        input_mask_expanded=tf.cast(tf.broadcast_to(tf.expand_dims(attention_mask,axis=-1),tf.shape(token_embeddings)),tf.float32)
        print(token_embeddings.shape)
        print(input_mask_expanded.shape)
        return tf.math.reduce_sum(token_embeddings*input_mask_expanded,axis=1)/tf.clip_by_value(tf.math.reduce_sum(input_mask_expanded,axis=1),1e-9,tf.float32.max)

# sentence_transformer.compile(optimizer=keras.optimizers.Adam(2e-5),loss=keras.losses.BinaryCrossentropy())
# history=sentence_transformer.fit(tf_dataset,epochs=20)
# sentence_transformer.save_weights('D:/Sentence Transformer/checkpoints/weights.h5')