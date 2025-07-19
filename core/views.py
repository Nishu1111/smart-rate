from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model  
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers 
from .models import Store, Rating, Product
from .serializers import (
    RegisterSerializer,
    StoreSerializer, RatingSerializer, ProductSerializer
)
import csv
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
 
User = get_user_model()
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        token['is_staff'] = user.is_staff
        token['user_id'] = user.id   
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['user_id'] = self.user.id 
        data['username'] = self.user.username  
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'role']
        read_only_fields = ['id', 'username', 'email']  


# class StoreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Store
#         fields = '__all__'
#user list view
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
#user update view
class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
#register 
class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
#store view set

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

#item view set
# class ItemViewSet(viewsets.ModelViewSet):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save()  

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
def export_ratings_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ratings.csv"'

    writer = csv.writer(response)
    writer.writerow(['Store', 'User', 'Score', 'Comment', 'Created At'])

    ratings = Rating.objects.all()
    for r in ratings:
        writer.writerow([r.store.name, r.user.username, r.score, r.comment, r.created_at])

    return response


