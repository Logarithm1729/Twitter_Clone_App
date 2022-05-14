from rest_framework import serializers

from .. import models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    last_login = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.User
        exclude = ['groups', 'user_permissions']
    
    def create(self, validated_data):
        user = models.User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.Profile
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Follow
        fields = '__all__'