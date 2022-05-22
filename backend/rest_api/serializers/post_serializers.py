from rest_framework import serializers

from .. import models


class PostSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.Post
        fields = '__all__'
        extra_kwargs = {'userPost': {'read_only': True}}

class CommentSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.Comment
        fields = '__all__'
        extra_kwargs = {'userComment': {'read_only': True}}

class LikeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    class Meta:
        model = models.Like
        fields = '__all__'