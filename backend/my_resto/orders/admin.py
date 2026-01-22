from django.contrib import admin

from base.base_admin import BaseAdmin

from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(BaseAdmin):
    list_display = (
        "id",
        "restaurant",
        "table",
        "status",
        "total_amount",
        "is_active",
        "created_at",
    )
    readonly_fields = ("created_at", "updated_at")


@admin.register(OrderItem)
class OrderItemAdmin(BaseAdmin):
    pass
