from django.db import models
from django.contrib.auth.models import AbstractUser
from db.base_model import BaseModel


# Create your models here.
class UserInfo(models.Model):
    #用户信息表
    uname = models.CharField(max_length=20,verbose_name='用户名',unique=True)
    ulogo = models.FileField(verbose_name='用户头像',upload_to='images',default='default.jpg')
    urealname = models.CharField(max_length=20,default="",verbose_name="真实姓名")
    uzhengjian_tel = models.CharField(max_length=18,default="",verbose_name="证件号码")
    usex = models.CharField(max_length=10,verbose_name="性别",default="")
    uphone = models.CharField(max_length=11,default="",verbose_name="手机号")
    ucredit = models.CharField(max_length=5,default="",verbose_name="信誉分")
    openID = models.CharField(max_length=30,default="",verbose_name="openID")
    
    def __str__(self):
        return self.openID

    class Meta:
        verbose_name = "用户信息"
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return u'UserInfo:%s'%self.urealname
