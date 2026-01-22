from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AnalyticsViewSet, OrderItemViewSet, OrderViewSet

router = DefaultRouter()
router.register(f"analytics", AnalyticsViewSet, basename="analytics")

router.register(f"", OrderViewSet, basename="order")
router.register(f"order-item", OrderItemViewSet, basename="order-item")

urlpatterns = [path("", include(router.urls))]
