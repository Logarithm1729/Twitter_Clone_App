from rest_framework import status, views, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from .. import serializers, models


class CreateUserAPIView(views.APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.validated_data)
        # serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)

class UserListAPIView(views.APIView):
    
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        users = get_user_model().objects.all()
        serializer = serializers.UserSerializer(instance=users, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

class UserPkAPIView(views.APIView):

    def get(self, request, pk, *args, **kwargs):
        user = get_user_model().objects.get(pk=pk)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        user = get_user_model().objects.get(pk=pk)
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    
    def delete(self, request, pk, *args, **kwargs):
        user = get_user_model().objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

class FollowViewSet(viewsets.ModelViewSet):
    queryset = models.Follow.objects.all()
    serializer_class = serializers.FollowSerializer