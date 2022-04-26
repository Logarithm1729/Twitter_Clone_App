from rest_framework import serializers

from .. import models


class PostSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S')
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S')

    class Meta:
        model = models.Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Like
        fields = '__all__'