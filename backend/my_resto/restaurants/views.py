# Create your views here.
from django.db import IntegrityError
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import RestoTable
from .serializers import RestaurantTableSerializer
from io import BytesIO

import qrcode
from django.conf import settings
from django.core.files import File
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .utils import generate_qr_token

class RestaurantTableViewSet(viewsets.ModelViewSet):
    queryset = RestoTable.objects.all()
    serializer_class = RestaurantTableSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        queryset = RestoTable.objects.all()
        restaurant_id = self.request.query_params.get("restaurant_id")

        if restaurant_id:
            queryset = queryset.filter(restaurant=restaurant_id)

        return queryset



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def update_qr_code(request, table_id):
    """
    Regenerate QR code for a table
    """
    table = RestoTable.objects.filter(id=table_id).first()
    if not table:
        return Response({"error": "Table not found"}, status=404)

    try:
        table.qr_token = generate_qr_token()
        qr_url = f"{settings.FRONTEND_URL}/scan/{table.restaurant_id}/{table.qr_token}"
        qr_img = qrcode.make(qr_url)
        buffer = BytesIO()
        qr_img.save(buffer, format="PNG")
        file_name = f"table_{table.restaurant.id}_{table.qr_token}.png"
        table.QR_code.save(file_name, File(buffer), save=False)
        table.save()

    except IntegrityError:
        return Response(
            {"error": "Could not regenerate QR code, please try again."}, status=500
        )

    return Response(
        {
            "table_id": table.id,
            "qr_token": table.qr_token,
            "QR_code_url": table.QR_code.url if table.QR_code else None,
        }
    )
