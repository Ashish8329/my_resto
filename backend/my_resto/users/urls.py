from django.urls import path, include
from .views import scan_qr, get_chef_orders
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()

# router.register(f'scan', , basename='scan-qr')

urlpatterns = [
    path('chef/orders/<int:restaurant_id>', get_chef_orders, name='chief-orders'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('scan/<str:qr_token>/', scan_qr, name='scan_qr'),
    path('', include(router.urls))
]