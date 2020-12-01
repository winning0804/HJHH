from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.request import Request
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from utils.default_value import default_response

# Create your views here.

class StatusList(mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self,request,format=None):
        Status = Order.objects.all()
        serializer = OrderSerializer(Status,many=True)
        result = default_response()
        result['data'] = serializer.data
        return Request(result)

    # def post(self,request,*args,**kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid()

class GoodsComments(APIView):
    def get_comments(self,pk,id):
        try:
            return Comments.objects.all()
        except Comments.DoesNotExist:
            raise Http404

    def get(self,request,pk,id,format=None):
        comment = self.get_comments(pk,id)
        serializer = CommentsSerializer(comment)
        result = default_response()
        result['data'] = serializer.data
        return Request(result)