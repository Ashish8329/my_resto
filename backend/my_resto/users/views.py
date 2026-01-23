from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from restaurants.models import RestoTable
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from orders.models import Order, OrderItem
from base.choices import OrderStatus, UserRole
from datetime import datetime, timedelta, timezone
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
@api_view(['GET'])
def scan_qr(request, qr_token):
    user_agent = request.headers.get("User-Agent")
    ip = request.META.get("REMOTE_ADDR") #TODO store the data for stati

    qr = RestoTable.objects.filter(qr_token=qr_token).first()
    if not qr:
        return Response({"error": "Invalid QR"}, status=404)

    return Response({
        "restaurant_id": qr.restaurant.id,
        "table_id": qr.id
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chef_orders(request, restaurant_id):
    """
    Returns active kitchen orders
    """
    user = request.user
    user_gp = list(user.groups.values_list('name', flat=True))
    if UserRole.OWNER.value in user_gp:
        user_role = UserRole.OWNER
    else:
        user_role = UserRole.CHEF

    orders = (
        Order.objects
        .filter(
            restaurant=restaurant_id,
        )
        .select_related('table')
        .prefetch_related('items__menu_item')
        .order_by('created_at')
    )

    res = []

    for order in orders:
        minutes_ago = int(
            (datetime.now(timezone.utc) - order.created_at).total_seconds() / 60
        )
        items = []
        for oi in order.items.all():
            items.append({
                "item_name": oi.menu_item.name,
                **({"price": oi.menu_item.price} if user_role == UserRole.OWNER else {}),
                "quantity": oi.quantity
            })

        data = {
            "order_id": order.id,
            "table_id": order.table.table_number,
            "status": order.status,
            "time": f"{minutes_ago} min ago",
            "items": items
        }

        if user_role == UserRole.OWNER:
            data["total_amount"] = order.total_amount
            data['created_at'] = order.created_at.strftime("%H:%M:%S")
            del data["time"]

        res.append(data)

    return Response(res)

class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )

        if not user:
            return Response(
                data = {'message' : 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
        user_roles = list(user.groups.values_list('name', flat=True))

        if UserRole.OWNER.value in user_roles:
            user_role = UserRole.OWNER
        else:
            user_role = UserRole.CHEF

        refresh = RefreshToken.for_user(user)

        response = Response({
            "access_token" : str(refresh.access_token),
            "user_role" : user_role,
            "restaurant_id": user.restaurant.id if user.restaurant else None
        },
        status=200)

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            samesite="strict",
            max_age=7*24*60*60
        )

        return response


class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        queryset = super().get_queryset()
        restaurant_id = self.request.query_params.get('restaurant_id')  
        if restaurant_id:
            queryset = queryset.filter(restaurant__id=restaurant_id)
        return queryset

    def create(self, request, *args, **kwargs):
        password = request.data.get('password')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if password:
            user.set_password(password)
            user.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)