import django_filters
from django_filters.rest_framework import FilterSet
from question.models import TblQuestionOption


class OptionFilter(FilterSet):
    class Meta:
        model = TblQuestionOption
        fields = {
            'id': ['in'],
        }
