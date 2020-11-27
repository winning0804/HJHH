from django.db import models
# from tinymce.models import HTMLField
# Create your models here.


class GoodsType(models.Model):
    # 物品种类模型类
    name = models.CharField(max_length=100) # 种类名称

    def __str__(self):
        return self.name


class GoodsOwner(models.Model):
    '''物品所属人模型类'''
    name = models.CharField(max_length=100)  # 物品所属人
    image = models.ImageField(upload_to='owner')  # 所属人头像
    addr = models.CharField(max_length=256)  # 所属人地址

    def __str__(self):
        return self.name


class GoodsSKU(models.Model):
    '''物品SKU模型类'''
    status_choices = (
        (0, '已借'),
        (1, '未借'),
        (3, '隐藏'),
    )
    name = models.CharField(max_length=20) # 物品名称
    desc = models.CharField(max_length=256) # 物品简介
    price1 = models.DecimalField(max_digits=10,decimal_places=2) # 物品租金
    price2 = models.DecimalField(max_digits=10,decimal_places=2) # 物品押金
    image = models.ImageField(upload_to='goods') # 物品图片
    score = models.DecimalField(max_digits=10,decimal_places=2) # 评分
    score_num = models.DecimalField(max_digits=10,decimal_places=2) # 评分人数
    status = models.SmallAutoField(default=1,choices=status_choices,primary_key=True) # 物品状态

    owner = models.ForeignKey(GoodsOwner,on_delete=models.CASCADE) # 物品持有者
    type = models.ForeignKey(GoodsType, on_delete=models.CASCADE)  # 物品种类

    def __str__(self):
        return self.name

class GoodsClassify(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
'''
class GoodsImage(BaseModel):
    # 物品图片模型类
    sku = models.ForeignKey('GoodsSKU') # 商品
    image = models.ImageField(upload_to='goods') # 图片路径

    class Meta:
        db_table = 'df_goods_image'
        verbose_name = '物品图片'
        verbose_name_plural = verbose_name
'''

class IndexTypeGoodsBanner(models.Model):
    '''首页商品展示模型类'''
    # type = models.ForeignKey(GoodsType,on_delete=models.CASCADE)  # 商品类型
    sku = models.ForeignKey(GoodsSKU,on_delete=models.CASCADE)  # 商品SKU


'''
class GoodsContent(BaseModel):
    # 用户评价
    isDelete = models.BooleanField(default=False) # 逻辑删除
    name = models.CharField(max_length=20, verbose_name='物品名称')
    cusername = models.CharField(max_length=20,verbose_name="借方昵称")
    cloge = models.CharField(verbose_name='借方头像', max_length=200,default=None)
    cuser_content = HTMLField(max_length=256,verbose_name="用户评论")

    class Meta:
        db_table = 'df_goods_content'
        verbose_name = '物品评论'
        verbose_name_plural = verbose_name
'''