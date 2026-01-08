from django.contrib import admin
from base.base_admin import BaseAdmin
from .models import Restaurant

@admin.register(Restaurant)
class RestaurantAdmin(BaseAdmin):
    pass