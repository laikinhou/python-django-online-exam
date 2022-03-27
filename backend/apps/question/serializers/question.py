from rest_framework import serializers

from question.models import TblQuestion


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblQuestion
        fields = '__all__'
        read_only_fields = ('create_time', 'update_time', 'creator', 'id')


class ReadQuestionSerializer(serializers.ModelSerializer):
    creator = serializers.CharField(source='creator.nickname', read_only=True)
    level_tag = serializers.CharField(source="level_tag.name", read_only=True)
    type_tag = serializers.CharField(source="type_tag.name", read_only=True)
    category_tag = serializers.CharField(source="category_tag.name", read_only=True)
    
    class Meta:
        model = TblQuestion
        fields = '__all__'
        read_only_fields = ('create_time', 'update_time', 'creator', 'id')