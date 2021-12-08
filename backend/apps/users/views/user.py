from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from django.contrib.auth.backends import UserModel

from users.serializers import UserInfoSerializer as Serializer


class UserViewset(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = UserModel.objects.all().order_by('-date_joined')
    serializer_class = Serializer
    # 默认是模糊查询
    search_fields = ('nickname', 'email')