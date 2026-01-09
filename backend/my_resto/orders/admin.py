from django.contrib import admin
from base.base_admin import BaseAdmin
from .models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(BaseAdmin):
    pass

@admin.register(OrderItem)
class OrderItemAdmin(BaseAdmin):
    pass
