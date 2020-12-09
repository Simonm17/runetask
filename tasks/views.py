from rest_framework.generics import (
ListCreateAPIView,
RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer


class TaskListCreateAPIView(ListCreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    lookup_field = 'uuid'


class TaskRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    lookup_field = 'uuid'
