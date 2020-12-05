from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Task
        fields = ['description', 'created_by', 'created_date', 'updated_date']