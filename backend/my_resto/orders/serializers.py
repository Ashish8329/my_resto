from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemsSerializer(serializers.ModelSerializer):
    menu_item = serializers.CharField(
        source='menu_item.name',
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['menu_item', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemsSerializer(many=True, read_only=True)
    class Meta:
        model= Order
        fields = ['id', 'status', 'total_amount', 'items']
        
class OrderCreateSerializer(serializers.Serializer):
    restaurant_id = serializers.IntegerField()
    table_id = serializers.IntegerField()
    items = serializers.ListField()

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Order must contain items")
        return items


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model= OrderItem
        fields ='__all__'