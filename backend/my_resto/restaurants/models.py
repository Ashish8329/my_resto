from django.db import models
from base.base_models import BaseModel


class Restaurant(models.Model):
    name = models.CharField(
        max_length=255
    )
    address = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    is_active=models.BooleanField(
        default=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name