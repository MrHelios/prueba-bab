from django.conf.urls import url;
import views;

urlpatterns = [
    url(r'^0/', views.home_phaser),
    url(r'^1/', views.home_phaser1),
    url(r'^2/', views.home_phaser2),
    url(r'^3/', views.home_phaser3),
    url(r'^4/', views.home_phaser4),
]
