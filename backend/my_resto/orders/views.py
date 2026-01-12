from django.shortcuts import render
from rest_framework import viewsets
from .models import OrderItem, Order
from menus.models import MenuCategory, MenuItem
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderItemSerializer, OrderCreateSerializer
from base.choices import OrderStatus, UserRole
from rest_framework.permissions import IsAuthenticated


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        queryset = Order.objects.prefetch_related('items__menu_item')
        restaurant_id = self.request.query_params.get('restaurant_id')
        if restaurant_id:
            queryset = queryset.filter(restaurant_id=restaurant_id)

        return queryset
    
    def create_order_items(self, items, order):
        total = 0
        for item in items:
            menu_item= MenuItem.objects.get(id=item.get('item_id'))

            OrderItem.objects.create(
                order= order,
                menu_item=menu_item,
                quantity=item.get('quantity'),
                price = menu_item.price
            )
            total += menu_item.price * item.get('quantity')
        return total
    
    def create_order(self, data):
        order = Order.objects.create(
            restaurant_id=data.get('restaurant_id'),
            table_id=data.get('table_id'),
            status=OrderStatus.PENDING
        )
        
        total = self.create_order_items(data.get('items', []), order)
        
        order.total_amount = total
        order.save()

        return order
    
    def update_order(self, order,  data):
        if data.get('status'):
            order.status = data.get('status')
        
        OrderItem.objects.filter(order=order).delete() # TODO fix RBV

        total = self.create_order_items(data.get('items',[]), order)
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

    def partial_update(self, request, pk=None):
        '''
        this view will update the order based on user role.
        cheaf : update the status 
        user : update the items
        '''
        try:
            user_roles = list(request.user.groups.values_list('name', flat=True))
            order = self.get_object()
            data = request.data
            serializer = self.get_serializer(order, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            if data.get('items'):
                OrderItem.objects.filter(order=order).delete()
                total_amount = self.create_order_items(data.get('items'), order)
                order.total_amount = total_amount
                serializer.validated_data['total_amount'] = total_amount
                
            serializer.save()
            return Response(serializer.data, status=200)

        except Exception as e:
            return Response(
                status=404, data=f'something went happend : {e}'
            )


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
