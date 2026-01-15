from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from restaurants.models import RestoTable
from rest_framework.response import Response
from rest_framework.decorators import api_view
from orders.models import Order, OrderItem
from base.choices import OrderStatus
from datetime import datetime, timedelta, timezone
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

@api_view(['GET'])
def get_chef_orders(request, restaurant_id):
    """
    Returns active kitchen orders
    """
    orders = (
        Order.objects
        .filter(
            restaurant=restaurant_id,
        )
        .select_related('table')
        .prefetch_related('items__menu_item')
        .order_by('created_at')
    )

    res = []

    for order in orders:
        minutes_ago = int(
            (datetime.now(timezone.utc) - order.created_at).total_seconds() / 60
        )
        items = []
        for oi in order.items.all():
            items.append({
                "item_name": oi.menu_item.name,
                "quantity": oi.quantity
            })

        res.append({
            "order_id": order.id,
            "table_id": order.table.id,
            "status": order.status,
            "time": f"{minutes_ago} min ago",
            "items": items
        })

    return Response(res)
