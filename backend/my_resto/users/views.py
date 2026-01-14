from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from restaurants.models import RestoTable
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def scan_qr(request, qr_token):
    user_agent = request.headers.get("User-Agent")
    ip = request.META.get("REMOTE_ADDR") #TODO store the data for stati

    qr = RestoTable.objects.filter(qr_token=qr_token).first()
    if not qr:
        return Response({"error": "Invalid QR"}, status=404)

    return Response({
        "restaurant_id": qr.restaurant.id,
        "table_id": qr.id
    })
