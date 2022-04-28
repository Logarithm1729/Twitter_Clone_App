from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('comments', views.CommentViewSet)
router.register('likes', views.LikeViewSet)
router.register('profile', views.ProfileViewSet)
router.register('follow', views.FollowViewSet)

urlpatterns = [
    path('user/register/', views.CreateUserAPIView.as_view()),
    path('user/list/', views.UserListAPIView.as_view()),
    path('user/detail/<str:pk>/', views.UserPkAPIView.as_view()),
    
    path('compose/', include(router.urls)),
    path('compose/myprofile/', views.MyProfileAPIView.as_view()),
]