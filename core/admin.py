from django.contrib import admin

# Register your models here.
from .models import User, Store, Rating

admin.site.register(User)
admin.site.register(Store)
admin.site.register(Rating)
