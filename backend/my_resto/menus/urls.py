from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import MenuCategoryViewSet, MenuItemViewSet

router = DefaultRouter()
router.register(f"items", MenuItemViewSet, basename="menu-item")
router.register(f"categories", MenuCategoryViewSet, basename="menu-category")

urlpatterns = [path("", include(router.urls))]
