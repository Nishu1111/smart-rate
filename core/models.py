from django.db import models 
from django.conf import settings
# Create your models here.
from django.contrib.auth.models import User, AbstractUser
#user model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('store_owner', 'Store Owner'),
        ('user', 'User'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.role})"
#store model

class Store(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='store_images/', null=True, blank=True)
    # owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='stores')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
class Product(models.Model):
    store = models.ForeignKey(Store, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

#rating model
class Rating(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.store.name} - {self.score} by {self.user.username}"
    
