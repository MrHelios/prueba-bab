from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^0/', views.home_cpu),
    url(r'^1/', views.home_gpu),
    url(r'^2/', views.home_gpu_obj),
    url(r'^tutorial-1/', views.tutorial_1),    
]
