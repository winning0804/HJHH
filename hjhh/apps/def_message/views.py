import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hjhh.settings")# project_name 项目名称
django.setup()

from django.shortcuts import render,redirect
from django.urls import reverse
from django.contrib import messages
from .models import Information,send
from ..models import UserInfo
from datetime import datetime
from django.http import HttpResponse
import json

# Create your views here.
#消息中心
def message(request):
    user = UserInfo.objects.get(id=request.session['user_id'])
    #消息用户名去重
    persons = Information.objects.filter(cinformation_id=user.id).values('chat_partner','ccheck').distinct().order_by('chat_partner')
    # 查看消息的已读状态
    # checks = Information.objects.filter(cinformation_id=user.id).values('cusername').distinct().order_by('cusername')
    # print("checks:%s,checks.count:%s" % (checks, checks.count()))
    print("消息列举:%s,消息长度：%s,消息个数:%s" %(persons, len(persons),persons.count()))
    #查询发消息者的头像
    imgs = UserInfo.objects.filter()
    context = {
        'title': '消息中心',
        'page_name': 1,
        'user':user,
        'persons':persons,
        'imgs':imgs,
        ###'guest_cart': 1,
        # 'checks':checks,
    }
    return HttpResponse(json.dump(context, ensure_ascii=False), content_type="application/json", charset='utf-8',
                        status='200', reason='success')

# 消息内容展示
def person_message(request):
    user = UserInfo.objects.get(id=request.session['user_id'])#当前登录用户
    #消息用户名去重
    persons = Information.objects.filter(cinformation_id=user.id).values('chat_partner','ccheck').distinct().order_by('chat_partner')
    # 查询发消息者的头像
    imgs = UserInfo.objects.filter()
    #展示消息
    username=request.GET['username']
    informations = Information.objects.filter()
    logo=UserInfo.objects.get(uname=username)     #当前用户的头像？
    print("informations:%s" % (informations))
    # 查看消息的已读状态
    # checks = Information.objects.filter(cinformation_id=user.id).values('cusername').distinct().order_by('cusername')
    # print("checks:%s,checks.count:%s" % (checks, checks.count()))
    #展示消息后使消息变为已读状态
    for information in informations:
        if information.user == username:
            information.ccheck=True
            information.save()
    #消息回复
    user_name=UserInfo.objects.get(uname=username)#获取当前消息用户信息

    #展示回复消息
    #persons1=Information.objects.filter(cusername=cusername).values('cusername1').distinct().order_by('cusername1')
    if request.method == "POST":
        cusername = user.uname   #当前用户
        cusername1 = user_name.uname  #发送方
        ccontent_chart = request.POST.get('title')
        cinformation_id = user_name.id
        if ccontent_chart == "":
            messages.success(request, "请输入内容！")
        else:
            Information.objects.create(myself=cusername, chat_partner=cusername1,
                                       cinformation_id=cinformation_id)
            send.objects.create(ccontent_chart=ccontent_chart)
            messages.success(request, "消息发送成功")
            return redirect(reverse("def_message:message"))
        context = {
            "code": '200',
            "msg": '成功',
            "data":{
                'title': '消息中心',
                'page_name': 1,
                'user': user,
                'informations': informations,
                'persons': persons,
                'imgs': imgs,
                'logo': logo,
                'username': username,
                'user_name': user_name,
                ###'guest_cart': 1,
                # 'checks':checks,
                # 'persons1':persons1,
            }
        }
        return HttpResponse(json.dump(context, ensure_ascii=False), content_type="application/json", charset='utf-8',
                        status='200', reason='success')
    else:
        return HttpResponse('It is not a POST request!!!')
