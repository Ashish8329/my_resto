from rest_framework import serializers

from .models import RestoTable


class RestaurantTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoTable
        fields = "__all__"

    def validate(self, attrs):
        restaurant = attrs.get("restaurant")
        table_number = attrs.get("table_number")

        qs = RestoTable.objects.filter(restaurant=restaurant, table_number=table_number)

        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError(
                {"table_number": "Table number already exists for this restaurant."}
            )

        return attrs

    def validate_unique(self, attrs):
        # ⛔ prevent Django's default composite unique error
        pass
