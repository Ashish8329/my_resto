from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        default=True 
    )
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username