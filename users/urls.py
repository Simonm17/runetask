from rest_framework import routers

from django.urls import path, include
from .api import viewsets


# how to use when reverse():
# e.g. reverse('users:detail')
# how to use in django templates:
# e.g. {% url 'users:detail' %}
app_name = 'users'

router = routers.DefaultRouter()
router.register(r'', viewsets.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]