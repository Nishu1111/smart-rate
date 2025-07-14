#import serializers to convert in JSON response
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Store, Rating
User = get_user_model()

# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff']  
        read_only_fields = ['id', 'username', 'email']  

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
            role = validated_data['role']
        )
        return user

#Store Serializer
class StoreSerializer(serializers.ModelSerializer):
    #owner = UserSerializer(read_only=True)

    class Meta:
        model = Store
        fields = '__all__'

# Rating Serializer
class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    store = serializers.PrimaryKeyRelatedField(queryset=Store.objects.all())

    class Meta:
        model = Rating
        fields = '__all__'
