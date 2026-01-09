from django.contrib import admin
from base.base_admin import BaseAdmin
from .models import MenuCategory, MenuItem
# Register your models here.

@admin.register(MenuCategory)
class MunuCategoryAdmin(BaseAdmin):
    pass

@admin.register(MenuItem)
class MunuItemyAdmin(BaseAdmin):
    pass