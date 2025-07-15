from django.contrib import admin

# models Register  here.
from .models import User, Store, Rating

admin.site.register(User)
admin.site.register(Store)
admin.site.register(Rating)
