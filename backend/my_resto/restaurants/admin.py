from django.contrib import admin
from base.base_admin import BaseAdmin
from .models import Restaurant, RestoTable

@admin.register(Restaurant)
class RestaurantAdmin(BaseAdmin):
    pass


@admin.register(RestoTable)
class RestaurantTableAdmin(BaseAdmin):
    pass