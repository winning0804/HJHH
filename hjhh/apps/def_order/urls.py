from django.conf.urls import url
from def_order import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path,include

urlpatterns = [
    path('status/',views.StatusList.as_view()),
    path('comment/',views.GoodsComments.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
