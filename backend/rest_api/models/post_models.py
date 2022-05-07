import os
from datetime import datetime
from django.db import models
# from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string

from .user_models import User

def create_path_of_posts_image(instance, filename):
    user_id = instance.id
    dt_now = datetime.now()
    uploaded_time = dt_now.strftime('%Y_%m_%d_%H_%M_%S_%f')
    return os.path.join('post_images', user_id, uploaded_time, filename)

def create_posts_id():
    return get_random_string(30)

class Post(models.Model):
    id = models.CharField(max_length=30, default=create_posts_id, primary_key=True, editable=False)
    title = models.CharField(max_length=30, blank=True, default='')
    content = models.TextField(max_length=300, default='')
    post_image = models.ImageField(upload_to=create_path_of_posts_image, null=True, blank=True)
    userPost = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Contributer')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at', 'id']

    def __str__(self):
        return f'{self.title}__[{self.id}]'

class Comment(models.Model):
    comment = models.TextField(max_length=100)
    postComment = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postComment')
    userComment = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userComment')
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    userLike = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userLike')
    postLike = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postLike')
    commentLike = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='commentLike')

