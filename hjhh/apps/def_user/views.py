from django.http import Http404
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
import json
from .wx_login import *
from django.core import cache
import hashlib,time
from .models import UserInfo

# Create your views here

#授权用户登录
class Login(APIView):
    def post(self,request):
        param = request.data
        if not param.get('code'):
            return Response({'status':1,"msg":"缺少参数"})
        else:
            code = param.get('code')
            user_data = login(code)
            if user_data:
                val = user_data['session_key'] + "&" + user_data['openid']
                md5 = hashlib.md5()
                md5.update(str(time.clock()).encode('utf-8'))
                md5.update(user_data['session_key'].encode('utf-8'))
                key = md5.hexdigest()
                cache.set(key,val)
                has_user = UserInfo.objects.filter(openID=user_data['openid']).first()
                if not has_user:
                    UserInfo.objects.create(openID=user_data['openid'])
                UserInfo.objects.update()
                return Response(
                    {
                        'status':0,
                        'msg':'ok',
                        'data':{'token':key}
                    }
                )
            else:
                return Response({'status':2,'msg':"无效的code"})

            
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

