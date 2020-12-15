from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication

from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly
from ..models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission to allow non-owner to read because tasks will be public
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'uuid'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)