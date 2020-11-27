from django.db import models
from def_goods.models import GoodsSKU
from def_user.models import UserInfo
import sys
sys.path.append("..")
# Create your models here.
class Order(models.Model):
    #订单表
    status_choices = (
        (1,'待审核'),
        (2,'待交易'),
        (3,'等待对方确认交易'),
        (4,'待归还'),
        (5,'等待对方确认归还')
    )
    belonger = models.ForeignKey(UserInfo,verbose_name='所属人',on_delete=models.CASCADE,related_name='user')
    user = models.ForeignKey(UserInfo,verbose_name='借方',on_delete=models.CASCADE,related_name='belonger')
    goods = models.ForeignKey(GoodsSKU,verbose_name='商品',on_delete=models.CASCADE)
    status = models.SmallIntegerField(verbose_name='状态',choices=status_choices)
    startdate = models.DateTimeField(verbose_name='出借时间')
    enddate = models.DateTimeField(verbose_name='归还时间')
    money = models.CharField(verbose_name='交易金额',max_length=10)


class Comments(models.Model):
    #评论
    user = models.ForeignKey(UserInfo,verbose_name='评论者',on_delete=models.CASCADE)
    goods = models.ForeignKey(GoodsSKU,verbose_name='商品',on_delete=models.CASCADE)
    stars = models.CharField(verbose_name='评星',max_length=1)
    comment = models.TextField(verbose_name='评论',max_length=100)
    comment_time = models.DateTimeField(verbose_name='评论时间')