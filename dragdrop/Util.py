'''
Created on 4 de nov. de 2015

@author: PC1
'''
from bigml.api import BigML

api = BigML('', '')


#Lista de estados de los recursos
ESTADOS= [None] * 3

def create_source(url):
    source = api.create_source(url, {'name': url, 'project': 
                                   'your_bigml_project_url',
                                   'source_parser': {'missing_tokens': ['?']}})
    ESTADOS[0] = 'true'
    return source

def create_dataset(source):
    dataset = api.create_dataset(source, {"name": source['object']['file_name'], 
                                       "size": 1024})
    ESTADOS[1] = 'true'
    return dataset

def create_model(dataset):
    model = api.create_model(dataset, {"name": dataset['object']['name']})
    ESTADOS[2] = 'true'
    return model

def delete_file(source, dataset, model):
    api.delete_model(model)
    api.delete_dataset(dataset)
    api.delete_source(source)
