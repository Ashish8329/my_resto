from django.urls import path, include
from .views import scan_qr
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

# router.register(f'scan', , basename='scan-qr')

urlpatterns = [
    path('scan/<str:qr_token>/', scan_qr, name='scan_qr'),
    path('', include(router.urls))
]