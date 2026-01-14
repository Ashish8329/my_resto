from io import BytesIO

import qrcode
from django.conf import settings
from django.core.files import File
from django.db import models

from base.base_models import BaseModel

from .utils import generate_qr_token


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class RestoTable(BaseModel):
    restaurant = models.ForeignKey(
        Restaurant, related_name="tables", on_delete=models.CASCADE
    )
    qr_token = models.CharField(unique=True, max_length=32, editable=False)
    QR_code = models.ImageField(upload_to="qr_codes/", null=True, blank=True)

    def save(self, *args, **kwargs):

        if not self.qr_token:
            self.qr_token = generate_qr_token()

        if not self.QR_code:
            qr_url = f"{settings.FRONTEND_URL}/scan/{self.qr_token}"
            qr_img = qrcode.make(qr_url)
            buffer = BytesIO()
            qr_img.save(buffer, format="PNG")

            file_name = f"table_{self.restaurant.id}_{self.qr_token}.png"
            self.QR_code.save(file_name, File(buffer), save=False)
        return super(*args, **kwargs).save()
