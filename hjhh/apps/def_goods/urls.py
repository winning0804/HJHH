from django.urls import path
from . import views

app_name = 'def_goods'

urlpatterns = [
    path('api/index_view',views.IndexView,name='IndexView'),# 首页
    path('api/detailview',views.DetailView,name='DetailView'),# 详情页
    path('api/listview',views.ListView,name='ListView'),# 列表页
    path('api/findview',views.FindView,name='FindView'),# 状态页
]
