from django.contrib import admin

from base.base_admin import BaseAdmin

from .models import Restaurant, RestoTable


@admin.register(Restaurant)
class RestaurantAdmin(BaseAdmin):
    list_display = ("id","name", "is_active", "created_at")


@admin.register(RestoTable)
class RestaurantTableAdmin(BaseAdmin):
    list_display = ('id',"restaurant", "qr_token", "created_at")
    readonly_fields = ("qr_token", "created_at", "updated_at")
