from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import MenuCategory, MenuItem
from .serializers import MenuCategorySerializer, MenuItemSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()
        category_id =  self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(menu_category=category_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer
