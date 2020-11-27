from django.shortcuts import render,redirect
from django.urls import reverse
from django.views.generic import View
from django.core.cache import cache
from .models import GoodsSKU,GoodsType,GoodsClassify,GoodsOwner,IndexTypeGoodsBanner
from django_redis import get_redis_connection
from def_order.models import Order
from def_user.models import UserInfo
from django.http import HttpResponse
import json
import random
from django.shortcuts import render,get_object_or_404

# Create your views here.
import sys
sys.path.append("..")

def IndexView(request):
    '''首页'''
    if request.method == "GET":
        '''显示首页'''
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
        return HttpResponse(json.dump(data,ensure_ascii=False),content_type="application/json",charset='utf-8',status='200',reason='success'),



'''
class IndexView(View):
    #首页
    def get(self,request):
        #显示首页
        # 获取商品的种类信息
        types = GoodsType.objects.all()

        # 获取首页商品信息
        goods_banners = IndexTypeGoodsBanner.objects.all().order_by('index')

        # 组织模板上下文
        context = {
            'types':types,
            'goods_banners':goods_banners
        }

        # 使用模板
        return render(request,'index.wxml',context)
'''

'''
详情页
method  POST
openid   用户ID
goods_id    商品ID
'''
def DetailView(request):
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
class DetailView(View):
    # 详情页
    def get(self,request,goods_id):
        # 显示详情页
        try:
            sku = GoodsSKU.objects.get(id=goods_id)
        except GoodsSKU.DoesNotExist:
            return redirect(reverse('goods:index'))
        # 获取商品的分类信息
        types = GoodsType.objects.all()

        # 获取商品的评论信息
        sku_orders = OrderGoods.objects.filter(sku=sku).exclude(comment='')

        # 组织模板上下文
        context = {
            'sku':sku,'types':types,
            'sku_orders':sku_orders
        }
        # 使用模板
        return render(request,'detail.wxml',context)
'''

'''
获取指定类型物品
method  POST
type    种类
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
class ListView(View):
    # 列表页（筛选）
    def get(self,request,type_id):
        # 显示列表页
        # 获取种类信息
        try:
            type = GoodsType.objects.get(id=type_id)
        except GoodsType.DoesNotExist:
            return redirect(reverse('goods:index'))

        # 获取商品的分类信息
        types = GoodsType.objects.all()

        # 获取分类商品的信息
        skus = GoodsSKU.objects.filter(type=type).order_by('-id')

        # 组织模板上下文
        context = {
            'type':type,'types':types,
            'skus':skus
        }
        return render(request,'list.wxml',context)
'''



'''
由状态获取自己的物品
method  POST
state   状态
openid  用户ID
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

'''
# 传入状态id
class FindView(View):
    # 申请
    def get(self,request,state_id):
        # 显示列表页
        # 获取商品信息
        skus = GoodsSKU.objects.filter(state_id=state_id).order_by('-id')

        # 组织模板上下文
        context = {
            'skus':skus
        }
        return render(request,'find.wxml',context)
'''




