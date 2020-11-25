from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserInfo
class loginviews(APIView):
    def post(self,request,*args,**kwargs):
        print(request.data)
        return Response({"status":True})




