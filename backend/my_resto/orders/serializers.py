from rest_framework import serializers
from .models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model= Order
        fields ='__all__'

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