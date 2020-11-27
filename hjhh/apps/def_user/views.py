from django.http import Http404
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
import json
# Create your views here

# 针对特定用户进行信息修改操作
class user_detail(APIView):
    def get_objects(self,pk):
        try:
            return UserInfo.objects.get(pk=pk)
        except UserInfo.DoesNotExist:
            raise Http404

    def put(self,request,pk):
        user = self.get_objects(pk)
        json_data = request.body.decode('utf-8')
        python_data = json.loads(json_data, encoding='utf-8')

        #反序列化，处理前端传入数据
        ser = UserInfoSerializer(data=python_data)
        try:
            ser.is_valid(raise_exception=True)
        except Exception as e:
            return JsonResponse(ser.errors)
        #更新项目
        user.uname = ser.validated_data['uname']
        user.ulogo = ser.validated_data['ulogo']

        #保存
        user.save()
        ser = UserInfoSerializer(instance=user)
        #json格式返回
        return JsonResponse(ser.data,status=201)


#用户信息认证
class getUserInfo(APIView):
    def post(self,request,*args,**kwargs):
        print(request.data)
        return Response({"status":True})

