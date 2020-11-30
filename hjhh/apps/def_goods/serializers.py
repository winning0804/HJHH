from .models import *
from rest_framework.serializers import ModelSerializer



class GoodsSKUSerializer(ModelSerializer):


    class Meta:
        model = GoodsSKU
        fields = "__all__"



class GoodsTypeSerializer(ModelSerializer):
    goods_type = GoodsSKUSerializer(many=True)

    class Meta:
        model = GoodsType
        fields = "__all__"





