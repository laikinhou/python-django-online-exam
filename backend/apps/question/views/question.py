from rest_framework.viewsets import ModelViewSet

from question.models import TblQuestion as Model
from question.serializers import CreateQuestionSerializer, ReadQuestionSerializer


class QuestionViewset(ModelViewSet):
    queryset = Model.objects.all().order_by('-id')
    serializer_class = CreateQuestionSerializer
    
    def get_serializer_class(self):
        if self.action in ('create', 'update'):
            self.serializer_class = CreateQuestionSerializer
        else:
            self.serializer_class = ReadQuestionSerializer
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)