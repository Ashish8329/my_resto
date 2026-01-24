from django.contrib import admin
from base.base_admin import BaseAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseAdmin):
    list_display = ('id', 'username', 'restaurant', 'is_active', 'date_joined')