from django.conf.urls import url
from . import views

app_name = 'def_user'
urlpatterns = [
    url(r'^user_detail', views.user_detail.as_view()),
    url(r'^getUserInfo', views.getUserInfo.as_view()),
    url(r'^Login', views.Login.as_view())
]
