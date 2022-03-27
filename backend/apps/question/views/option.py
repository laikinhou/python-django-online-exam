from rest_framework.viewsets import ModelViewSet

from question.models import TblQuestionOption as Model
from question.serializers import OptionSerializer as Serializer
from question.filters import OptionFilter as Filter


class OptionViewset(ModelViewSet):
    queryset = Model.objects.all().order_by('-id')
    serializer_class = Serializer
    filter_class = Filter