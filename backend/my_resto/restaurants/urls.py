from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import RestaurantTableViewSet, update_qr_code

router = DefaultRouter()
router.register(r"restaurant-tables", RestaurantTableViewSet)
urlpatterns = [
    path("update-qr-code/<int:table_id>/", update_qr_code, name="update-qr-code"),
    path("", include(router.urls)),
]
