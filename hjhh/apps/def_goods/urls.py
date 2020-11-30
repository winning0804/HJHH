from django.conf.urls import url,include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib import admin
from django.urls import path
from django.utils.decorators import method_decorator

app_name = 'def_goods'


urlpatterns = [

    # url(r'^$', views.index),
    # url(r'^index_view',views.IndexView),# 首页
    # url(r'^detailview',views.DetailView),# 详情页
    # url(r'^listview',views.ListView),# 列表页
    # url(r'^findview',views.FindView),# 状态页


    # path('index_view',views.IndexView),# 首页
    # path('detailview',views.DetailView,name='DetailView'),# 详情页
    # path('listview',views.ListView,name='ListView'),# 列表页
    # path('findview',views.FindView,name='FindView'),# 状态页

    path('index/',views.index),
    path('indexview/',views.IndexView.as_view()),
    path('listview/',views.ListView.as_view()),
    path('indexview/<int:pk>/',views.DetailView.as_view()),
    path('findview/<int:state>',views.FindView.as_view())
]
urlpatterns = format_suffix_patterns(urlpatterns)