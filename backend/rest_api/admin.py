from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

from . import models


class ProfileInline(admin.StackedInline):
    model = models.Profile
    can_delete=False

class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'is_active', 'is_admin']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_superuser', 'is_active',)}),
        ('Login Info', {'fields': ('last_login',)})
    )

    add_fieldsets = (
        (None, {'classes': ('wide',),
        'fields': ('email', 'password1', 'password2')}),
    )

    search_fields = ('email',)
    list_filter = ('is_admin',)
    ordering = ('email',)
    inlines = [ProfileInline]

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile)
admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.Like)
admin.site.register(models.Follow)
admin.site.unregister(Group)
