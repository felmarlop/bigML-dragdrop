'''
Created on 3 de nov. de 2015

@author: PC1
'''
from django.conf.urls import url
from . import views

urlpatterns = [
            url(r'^$', views.new_file, name='new_file'),
            url(r'^files/', views.data_list),
            url(r'^file/(?P<pk>[0-9]+)/$', views.data_detail),
            url(r'^delete_file/(?P<pk>[0-9]+)/$', views.delete_file),
            url(r'^delete_file_detail/(?P<pk>[0-9]+)/$', views.delete_file_detail),
            url(r'^check_states/', views.check_states),
]