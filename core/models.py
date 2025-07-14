from django.db import models 
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
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stores')
    image = models.ImageField(upload_to='store_images/', blank=True, null=True)

    def __str__(self):
        return self.name 
#rating model
class Rating(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.store.name} - {self.score} by {self.user.username}"
    
