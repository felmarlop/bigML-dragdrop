from django.db import models
from django.utils import timezone
import datetime
from django.shortcuts import get_object_or_404
from .Util import create_dataset,create_model, create_source
from dragdrop.Util import delete_file
from django.http import JsonResponse
from django.http.response import HttpResponse


# Create your models here.
class Bigml_File(models.Model):
    
    author = models.ForeignKey('auth.User')
    data = models.FileField(upload_to='uploads/')
    url = models.CharField(max_length = 255, blank =True, null=True)
    source_url = models.CharField(max_length = 255, blank =True, null=True)
    dataset_url = models.CharField(max_length = 255, blank =True, null=True)
    model_url = models.CharField(max_length = 255, blank =True, null=True)
    published_date = models.DateTimeField(
                blank=True, null=True)
    
    def modify(self, pk):
        files = get_object_or_404(Bigml_File, pk=pk)
        #Making the source
        source = create_source('uploads/'+files.url)
        #Making the dataset
        dataset = create_dataset(source)
        #Making the model
        model = create_model(dataset)
        
        files.source_url = source['resource']
        files.dataset_url = dataset['resource']
        files.model_url = model['resource']
        files.published_date = timezone.now()
        files.save()
        
    
    def age(self):
        difference = (timezone.now() - self.published_date)
        days = difference.days
        seconds = difference.seconds
        res = ''
        if days < 1:
            if seconds < 60:
                res = str(seconds)+' sec'
            elif seconds < 3600:
                res = str(seconds/60)+' min'
            elif seconds < 216000:
                res = str(seconds/3600)+' h'
        else:
            if days < 30:
                res = str(days)+' d'
            elif days < 365:
                res = str(days/30)+' m'
            else:
                res = str(days/365)+' y'
        return res
    
    def delete_ml(self):
        delete_file(self.source_url, self.dataset_url, self.model_url)
        
    def __str__(self):
        return self.url