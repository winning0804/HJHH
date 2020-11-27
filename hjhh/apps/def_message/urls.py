import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hjhh.settings")# project_name 项目名称
django.setup()

from django.conf.urls import url
from . import views

app_name = 'def_message'
urlpatterns = [
        url('api/get_message',views.message, name="message"),
        url('api/get_message_detail', views.message_detail, name="message_detail"),
        # url(r'^kefu_message/$', kefu_message, name="kefu_message"),
]
