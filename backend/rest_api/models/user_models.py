from email.policy import default
import os
from datetime import datetime
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.crypto import get_random_string
from django.contrib.auth import get_user_model


def create_path_of_prof_image(instance, filename):
    user_id = instance.id
    dt_now = datetime.now()
    uploaded_time = dt_now.strftime('%Y_%m_%d_%H_%M_%S_%f')
    return os.path.join('user_images', user_id, uploaded_time, filename)

def create_id():
    return get_random_string(30)

def create_unique_user_id():
    return get_random_string(50)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('email is must !!')
        
        user = self.model(email = self.normalize_email(email),)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password
        )
        user.is_admin=True
        user.is_superuser=True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(max_length=30, default=create_id, editable=False, primary_key=True)
    email = models.EmailField(
        'Email',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELD = ['email']

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Profile(models.Model):
    id = models.CharField(max_length=30, default=create_id, editable=False, primary_key=True)
    user_id = models.CharField(max_length=50, unique=True, default=create_unique_user_id, blank=False)
    username = models.CharField(max_length=30, blank=True, default='')
    first_name = models.CharField(max_length=30, blank=True, default='')
    last_name = models.CharField(max_length=30, blank=True, default='')
    age = models.PositiveIntegerField(default=0, blank=True)
    prof_image = models.ImageField(upload_to=create_path_of_prof_image, default='', null=True, blank=True)
    userProfile = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='related_user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id

class Follow(models.Model):
    userFollowing = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='following')
    userFollower = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='follower')