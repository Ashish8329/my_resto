from datetime import timedelta

from django.db.models import Sum
from django.shortcuts import render
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.choices import OrderStatus, UserRole
from menus.models import MenuCategory, MenuItem
from restaurants.models import Restaurant, RestoTable

from .models import Order, OrderItem
from .serializers import (OrderCreateSerializer, OrderItemSerializer,
                          OrderSerializer)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        queryset = Order.objects.prefetch_related("items__menu_item")
        restaurant_id = self.request.query_params.get("restaurant_id")
        is_active = self.request.query_params.get("is_active")
        table_id = self.request.query_params.get("table_id")

        if is_active:
            queryset = queryset.filter(is_active=is_active)

        if restaurant_id:
            queryset = queryset.filter(restaurant=restaurant_id)

        if table_id:
            queryset = queryset.filter(table=table_id)

        return queryset

    def create_order_items(self, items, order):
        total = 0
        for item in items:
            menu_item = MenuItem.objects.get(id=item.get("item_id"))

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=item.get("quantity"),
                price=menu_item.price,
            )
            total += menu_item.price * item.get("quantity")
        return total

    def create_order(self, data):
        order = Order.objects.create(
            restaurant_id=data.get("restaurant_id"),
            table_id=data.get("table_id"),
            status=OrderStatus.PENDING,
        )

        total = self.create_order_items(data.get("items", []), order)

        order.total_amount = total
        order.save()

        return order

    def update_order(self, order, data):
        if data.get("status"):
            order.status = data.get("status")

        OrderItem.objects.filter(order=order).delete()  # TODO fix RBV

        total = self.create_order_items(data.get("items", []), order)
        order.total_amount = total
        order.save()

        return order

    def create(self, request, *args, **kwargs):
        data = request.data
        if request.data.get("qr_token"):
            table = RestoTable.objects.get(qr_token=request.data["qr_token"])
            data["table_id"] = table.id

        serializer = OrderCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        order = self.create_order(serializer.validated_data)

        return Response(OrderSerializer(order).data, status=201)

    def partial_update(self, request, pk=None):
        """
        this view will update the order based on user role.
        cheaf : update the status
        user : update the items
        """
        try:
            user_roles = list(request.user.groups.values_list("name", flat=True))
            order = self.get_object()
            data = request.data
            serializer = self.get_serializer(order, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            if data.get("items"):
                OrderItem.objects.filter(order=order).delete()
                total_amount = self.create_order_items(data.get("items"), order)
                order.total_amount = total_amount
                serializer.validated_data["total_amount"] = total_amount

            serializer.save()
            return Response(serializer.data, status=200)

        except Exception as e:
            return Response(status=404, data=f"something went happend : {e}")


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class AnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [
        IsAuthenticated,
    ]

    def list(self, request):
        """
        return basic analytics for restaurant
        includes
        - total revenue
        - total orders
        - average order value
        # - popular items

        current day order(status wise)
        filter by - today, yessterday, last 7 days, last 30 days

        """
        restaurant_id = request.query_params.get("restaurant_id")
        timeframe = request.query_params.get("timeframe", "today")

        if not restaurant_id:
            return Response(status=400, data="restaurant_id is required")

        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            return Response(status=404, data="restaurant not found")

        orders = Order.objects.filter(restaurant=restaurant)

        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        # finds todays statuswise orders
        today_orders = orders.filter(created_at__gte=today_start)
        status_summary = {}
        for status, _ in OrderStatus.choices:
            count = today_orders.filter(status=status).count()
            status_summary[status] = count

        if timeframe == "today":
            start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        elif timeframe == "yesterday":
            start_date = (now - timedelta(days=1)).replace(
                hour=0, minute=0, second=0, microsecond=0
            )
            end_date = start_date + timedelta(days=1)
            orders = orders.filter(created_at__gte=start_date, created_at__lt=end_date)
        elif timeframe == "last_7_days":
            start_date = now - timedelta(days=7)
        elif timeframe == "last_30_days":
            start_date = now - timedelta(days=30)
        else:
            return Response(status=400, data="invalid timeframe")

        if timeframe in ["today", "last_7_days", "last_30_days"]:
            orders = orders.filter(created_at__gte=start_date)

        total_revenue = (
            orders.filter(is_active=True).aggregate(total=Sum("total_amount"))["total"]
            or 0
        )
        total_orders = orders.count()
        average_order_value = total_revenue / total_orders if total_orders > 0 else 0

        data = {
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "average_order_value": average_order_value,
            "today_status_summary": status_summary,
        }

        return Response(data, status=200)
