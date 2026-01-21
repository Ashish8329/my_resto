from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ManageMenuItemViewSet, MenuCategoryViewSet, MenuItemViewSet

router = DefaultRouter()
router.register(f"items", MenuItemViewSet, basename="menu-item")
router.register(f"categories", MenuCategoryViewSet, basename="menu-category")
router.register(f"manage-items", ManageMenuItemViewSet, basename="manage-menu-item")
urlpatterns = [path("", include(router.urls))]
