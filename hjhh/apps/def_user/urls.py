from django.conf.urls import url
from . import views

app_name = 'def_user'
urlpatterns = [
    url(r'^loginviews',views.loginviews.as_view())
]
