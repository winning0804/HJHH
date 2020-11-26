import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hjhh.settings")# project_name 项目名称
django.setup()

from django.db import models
from datetime import datetime
from tinymce.models import HTMLField
from def_user.models import UserInfo
# Create your models here.

class Information(models.Model):

    isDelete = models.BooleanField(default=False)  # 逻辑删除
    myself=models.CharField(max_length=20, verbose_name="自己")
    chat_partner= models.CharField(max_length=20, verbose_name="聊天对象")
    imgs1 = models.CharField(verbose_name='自己头像', max_length=200, default=None)
    imgs2 = models.CharField(verbose_name='聊天对象头像', max_length=200, default=None)
    ccheck = models.BooleanField(verbose_name="消息是否已读", default=False)
    cinformation = models.ForeignKey(UserInfo, on_delete=models.CASCADE, verbose_name="消息")  # 外键关联UserInfo表

class send(models.Model):
    ccontent_chart = HTMLField(max_length=200, verbose_name="消息内容")
    ccheck = models.BooleanField(verbose_name="消息是否已读", default=False)
    date_publish = models.DateTimeField(verbose_name="发送时间", default=datetime.now)

    class Meta:
        verbose_name = "用户消息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.chat_partner

