from django.shortcuts import render,redirect
from django.urls import reverse
from django.views.generic import View
from django.core.cache import cache
from .models import *
from .serializers import *
from def_order.models import Order
from def_user.models import UserInfo
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from utils.default_value import default_response
from django.http import Http404
import json
import random
from django.shortcuts import render,get_object_or_404

# Create your views here.
import sys
sys.path.append("..")


def index(request):
    return HttpResponse("Hello world !  django ~~")


class IndexView(mixins.ListModelMixin,generics.GenericAPIView,mixins.CreateModelMixin):
    queryset = GoodsSKU.objects.all()
    serializer_class = GoodsSKUSerializer

    def get(self,request,format=None):
        product = GoodsSKU.objects.all()
        serializer = GoodsSKUSerializer(product,many=True)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        result = default_response()
        result['data'] = serializer.data
        return Response(result)




'''
def IndexView(request):
    # 首页
    # return HttpResponse('IndexView!')
    if request.method == "GET":
        # 显示首页
        # 获取首页商品信息
        goods_banners = GoodsSKU.objects.all().order_by('index')

        arrayList = []
        for item in goods_banners:
            arrayList.append(
                {
                    'name':item.name,
                    'type':item.type,
                    'price1':item.price1,
                    'price2':item.price2,
                    'image':item.image,
                }
            )
        data = {
            "code":'200',
            "msg":'成功',
            "data":arrayList
        }
        # print(arrayList)
        return HttpResponse(json.dump(data,ensure_ascii=False),content_type="application/json",charset='utf-8',status='200',reason='success'),
    else:
        return HttpResponse("Is's not a GET request!!!")
'''

class DetailView(APIView):
    def get_objects(self,pk):
        try:
            return GoodsSKU.objects.get(pk=pk)
        except GoodsSKU.DoesNotExist:
            raise Http404

    def get(self,request,pk,format=None):
        product = self.get_objects(pk)
        serializer = GoodsSKUSerializer(product)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)

    def put(self,request,pk,format=None):
        product = self.get_objects(pk)
        serializer = GoodsSKUSerializer(product,data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk,format=None):
        product = self.get_objects(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




'''
详情页
method  POST
openid   用户ID
goods_id    商品ID
'''

'''
def DetailView(request):
    # return HttpResponse('DetailView!!')
    if request.method == 'POST':
        data_string = request.POST
        try:
            goods_id = data_string['goodsId']
            openid = data_string['openId']
        except Exception as e:
            print(e)
            print('获取前端传回的数据失败')
            return
        goods_detail = GoodsSKU.objects.filter(id=goods_id)

        goods_orders = Order.objects.filter(id=goods_id).exclude(comment='')

        data = {
            "code":200,
            "msg":'成功',
            "data":{
                "name":goods_detail[0].name,
                "type":goods_detail[0].type,
                "image":goods_detail[0].image,
                "price1":goods_detail[0].price1,
                "price2":goods_detail[0].price2,
                "desc":goods_detail[0].desc,
                "owner_name":goods_detail[0].owner.name,
                "owner_image":goods_detail[0].owner.image,
                "owner_addr":goods_detail[0].owner.addr,
                "comment_user":goods_orders[0].comment.name,
                "comment_image":goods_orders[0].comment.image,
                "comment_star": goods_orders[0].comment.star,
                "comment_time": goods_orders[0].comment.time,
                "comment_content": goods_orders[0].comment.content
            }
        }

        return HttpResponse(json.dump(data,ensure_ascii=False),content_type="application/json",charset='utf-8',status='200',reason='success')
    else:
        return HttpResponse('It is not a POST request!!!')
'''



class ListView(mixins.ListModelMixin,generics.GenericAPIView):
    queryset = GoodsType.objects.all()
    serializer_class = GoodsTypeSerializer

    def get(self,request,format=None):
        category = GoodsType.objects.all()
        serializer = GoodsTypeSerializer(category,many=True)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)


'''
获取指定类型物品
method  POST
type    种类
'''

'''
def ListView(request):
    if request.method == 'POST':
        data_string = json.load(request.body)
        try:
            type = data_string['type']
        except Exception as e:
            print(e)
            print('获取前端传回的数据失败',data_string)
            return
        goods_type = GoodsClassify.objects.filter(type=type)
        goods_list = GoodsSKU.objects.filter(type_id=goods_type[0].id).order_by("-id")
        list = []
        for item in goods_list:
            list.append({
                'name':item.name,
                'type':item.type,
                'price1':item.price1,
                'price2':item.price2,
                'image':item.image
            }
            )
        data = {
            "code":'200',
            "msg":'成功',
            "data":list,
        }
        return HttpResponse(json.dump(data,ensure_ascii=False),
                            content_type="application/json", charset='utf-8',
                            status='200', reason='success')
    else:
        return HttpResponse('It is not a POST request!!!')
'''

class FindView(APIView):
    def get_objects(self,state):
        try:
            return GoodsSKU.objects.get(state=state)
        except GoodsSKU.DoesNotExist:
            raise Http404

    def get(self,request,state,format=None):
        product = self.get_objects(state)
        serializer = GoodsSKUSerializer(product)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)



'''
由状态获取自己的物品
method  POST
state   状态
openid  用户ID
'''

'''
def FindView(request):
    if request.method == 'POST':
        data_string = request.POST
        try:
            stateid = data_string['state']
            openid = data_string['openId']
        except Exception as e:
            print(e)
            print('获取前端传回的数据失败')
            return
        goods_id = Order.objects.filter(id=openid,stateid=stateid)
        time = Order.objects.filter(id=openid,stateid=stateid)
        price = Order.objects.filter(id=openid,stateid=stateid)
        sideuser = Order.objects.filter(id=openid,stateid=stateid)

        for item in goods_id:
            goods_list = GoodsSKU.objects.filter(id=item).order_by("-id")
            list = []
            for i in goods_list:
                list.append({
                    'name':i.name,
                    'image':i.image,
                    'time':time,
                    'price':price,
                    'sideuser':sideuser,# 所属人或借方
                })
        data = {
            "code":'200',
            "msg":'成功',
            "data":list
        }
        return HttpResponse(json.dumps(data, ensure_ascii=False), content_type="application/json", charset='utf-8',
                            status='200', reason='success')
    else:
        return HttpResponse('It is not a POST request!!!')
'''


'''
由状态获取对方的物品
method  POST
state   状态(已借/未借）
ownerid   物品所属人
用户模块实现
'''
'''
def BorrowerView(request):
    if request.method == 'POST':
        data_string = request.POST
        try:
            stateid = data_string['state']
            ownerid = data_string['ownerid']
        except Exception as e:
            print(e)
            print('获取前端传回的数据失败')
            return
        goods_list = GoodsSKU.objects.filter(id=ownerid,stateid=stateid)
        list = []
        for item in goods_list:
            list.append({
                'name':item.name,
                ''
            })
'''




