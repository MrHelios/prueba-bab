from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home1/', include('prueba1.urls')),
    url(r'^home2/', include('prueba2.urls')),
]
