from django.shortcuts import render
from rest_framework import viewsets
from .models import OrderItem, Order
from menus.models import MenuCategory, MenuItem
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderItemSerializer, OrderCreateSerializer
from base.choices import OrderStatus

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create_order(self, data):
        order = Order.objects.create(
            restaurant_id=data.get('restaurant_id'),
            table_id=data.get('table_id'),
            status=OrderStatus.PENDING
        )
        total = 0
        for item in data.get('items'):
            menu_item = MenuItem.objects.get(id=item.get('item_id'))

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=item.get('quantity'),
                price=menu_item.price
            )

            total += menu_item.price * item.get('quantity') 
        
        order.total_amount = total
        order.save()

        return order

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = self.create_order(serializer.validated_data)

        return Response(
            OrderSerializer(order).data,
            status=201
        )


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
