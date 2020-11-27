from django.conf.urls import url
from . import views

app_name = 'def_user'
urlpatterns = [
    url(r'^user_list',views.user_list.as_view()),
    url(r'^user_detail', views.user_detail.as_view())
]
