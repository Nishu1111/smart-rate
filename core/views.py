from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Store, Rating
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, RegisterSerializer,
    StoreSerializer, RatingSerializer
)

import csv
from django.http import HttpResponse

User = get_user_model()

#Register API
class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# Store ViewSet
class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Rating ViewSet
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# CSV Export View
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def export_ratings_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ratings.csv"'

    writer = csv.writer(response)
    writer.writerow(['Store', 'User', 'Score', 'Comment', 'Created At'])

    ratings = Rating.objects.all()
    for r in ratings:
        writer.writerow([r.store.name, r.user.username, r.score, r.comment, r.created_at])

    return response
