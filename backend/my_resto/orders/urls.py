from django.urls import path, include
from .views import OrderViewSet, OrderItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(f'', OrderViewSet, basename='order')
router.register(f'order-item', OrderItemViewSet, basename='order-item')

urlpatterns = [
    path('', include(router.urls))
]