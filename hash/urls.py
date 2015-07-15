from django.conf.urls import include, url
from hashapp import views

urlpatterns = [
    url(r'^$', views.string),
    url(r'^api/', include('api.urls')),
    url(r'^string/$', views.string),
    url(r'^text/$', views.text),
    url(r'^file/$', views.file),
    url(r'^api/$', views.api),
]
