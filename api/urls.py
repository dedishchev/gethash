from django.conf.urls import patterns, url
from api import views

urlpatterns = patterns(
    '',
    url(r'^(?P<algorithm>\w+)/(?P<text>.+)/$', views.HashView.as_view()),
    url(r'^(?P<algorithm>\w+)/$', views.HashView.as_view()),
)
