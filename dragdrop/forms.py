'''
Created on 3 de nov. de 2015

@author: PC1
'''
from django import forms
from .models import Bigml_File
from django.forms.widgets import FileInput


class BigmlForm(forms.ModelForm):
    
    class Meta:
        model = Bigml_File
        fields = ('data',)
        
    def __init__(self, *args, **kwargs):
        super(BigmlForm, self).__init__(*args, **kwargs)
        self.fields['data'].widget = FileInput(attrs={
            'id': 'fileid',
            'onchange': 'selectedFiles();',
            'style':'margin: 0 auto;',
            'title':'Upload your file'})
    
    