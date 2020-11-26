import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hjhh.settings")# project_name 项目名称
django.setup()

from django.conf.urls import url
from . import views

app_name = 'def_message'
urlpatterns = [
        url('^message/$',views.message, name="message"),
        url('^person_message/$', views.person_message, name="person_message"),
        # url(r'^kefu_message/$', kefu_message, name="kefu_message"),
]
