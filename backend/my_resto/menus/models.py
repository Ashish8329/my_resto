from django.db import models
from base.base_models import BaseModel


class MenuCategory(BaseModel):
    restaurant = models.ForeignKey(
        "restaurants.Restaurant",
        related_name="menu_categorys",
        on_delete=models.SET_NULL,
        null=True,
    )
    name = models.CharField(max_length=255, verbose_name="Category Name")

    def __str__(self):
        return self.name


class MenuItem(BaseModel):
    restaurant = models.ForeignKey(
        "restaurants.Restaurant",
        related_name="menu_items",
        on_delete=models.CASCADE,
    )
    menu_category = models.ForeignKey(
        MenuCategory,
        related_name="menu_items",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=255, verbose_name="Item Name")
    price = models.IntegerField(
        verbose_name="Item Price",
    )
    is_available = models.BooleanField(
        default=True,
    )
    image_url = models.ImageField(
        upload_to="menu_items/",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name
