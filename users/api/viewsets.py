from rest_framework import viewsets
from .permissions import IsAdminOrOwner
from django.contrib.auth.models import User

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    permission_classes = [IsAdminOrOwner]