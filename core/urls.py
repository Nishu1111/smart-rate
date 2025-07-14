
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView
from .views import (
    RegisterAPI, StoreViewSet, UserUpdateView, UserListView,
    RatingViewSet, export_ratings_csv
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'stores', StoreViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('users/', UserListView.as_view()),
    path('users/<int:pk>/', UserUpdateView.as_view()),  
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('export-csv/', export_ratings_csv, name='export_csv'),
    path('', include(router.urls)),
]


