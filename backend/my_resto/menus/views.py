from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import MenuCategory, MenuItem
from .serializers import MenuCategorySerializer, MenuItemSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        restaurant_id = self.request.query_params.get('restaurant_id')
        category_id  =  self.request.query_params.get('category_id')
        if restaurant_id:
            queryset = queryset.filter(restaurant=restaurant_id)
        
        if category_id:
            queryset = queryset.filter(menu_category=category_id)
        return queryset


class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer
