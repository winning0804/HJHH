from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .models import *

from apps.utils.default_value import default_response
from .serializers import *


#Create your views here

#获取用户列表
class user_list(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

#针对特定用户进行信息修改操作
class user_detail(APIView):
    def get_objects(self,pk):
        try:
            return UserInfo.objects.get(pk=pk)
        except UserInfo.DoesNotExist:
            raise Http404
    def get(self,request,pk,format=None):
        user = self.get_objects(pk)
        serializer = UserInfoSerializer(user)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)
    def put(self,request,pk,format=None):
        user = self.get_objects(pk)
        serializer = UserInfoSerializer(user,data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            result = default_response()
            result['data'] = serializer.data
            return Response(result)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk,format=None):
        user = self.get_objects(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#用户信息认证


