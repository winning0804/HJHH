from .models import *
from def_user.serializers import *
from rest_framework.serializers import ModelSerializer



class OrderSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"


class CommentsSerializer(ModelSerializer):

    class Meta:
        model = Comments
        fields = "__all__"