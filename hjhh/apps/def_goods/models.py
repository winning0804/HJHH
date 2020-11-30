from django.db import models
from def_user.models import *
from django.contrib.auth.models import User
# from tinymce.models import HTMLField
# Create your models here.


class GoodsType(models.Model):
    # 物品种类模型类
    name = models.CharField(default="",max_length=100,verbose_name="种类名称",help_text="种类名称",unique=True) # 种类名称
    data_created = models.DateTimeField(auto_now_add=True,null=True)
    data_updated = models.DateTimeField(auto_now=True,null=True)

    class Meta:
        verbose_name = "物品类型"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name



class GoodsSKU(models.Model):
    '''物品SKU模型类'''
    status_choices = (
        (0, '已借'),
        (1, '未借'),
        (3, '隐藏'),
    )
    name = models.CharField(max_length=200,verbose_name="物品名称") # 物品名称
    desc = models.TextField(null=True,blank=True,verbose_name="物品简介") # 物品简介
    price1 = models.FloatField(null=True,verbose_name="物品租金") # 物品租金
    price2 = models.FloatField(null=True,verbose_name="物品押金") # 物品押金
    image = models.TextField(null=True,blank=True,verbose_name="物品tup")
    owner_image = models.TextField(null=True,blank=True,verbose_name="物品所属人头像")
    owner_name = models.CharField(max_length=60,null=True,blank=True,verbose_name="物品所属人姓名")
    owner_addr = models.CharField(max_length=100,null=True,blank=True,verbose_name="物品所属人地址")
    # image = models.ImageField(upload_to='goods') # 物品图片
    score = models.DecimalField(max_digits=10,decimal_places=2) # 评分
    score_num = models.DecimalField(max_digits=10,decimal_places=2) # 评分人数
    status = models.CharField(default='100',choices=status_choices,max_length=30,verbose_name="物品状态") # 物品状态

    owner = models.ForeignKey(UserInfo,on_delete=models.CASCADE,related_name="mygoods") # 物品持有者
    type = models.ForeignKey(GoodsType, on_delete=models.CASCADE,related_name="goods_type")  # 物品种类

    date_created = models.DateTimeField(auto_now_add=True,null=True)
    date_updated = models.DateTimeField(auto_now=True,null=True)
    delete_flag = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "物品"


'''
class GoodsClassify(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
'''

'''
class IndexTypeGoodsBanner(models.Model):
    # 首页商品展示模型类
    # type = models.ForeignKey(GoodsType,on_delete=models.CASCADE)  # 商品类型
    sku = models.ForeignKey(GoodsSKU,on_delete=models.CASCADE)  # 商品SKU
'''