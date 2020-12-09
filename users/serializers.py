from django.contrib.auth.models import User
from rest_framework import serializers
from tasks.models import Task
from tasks.serializers import TaskSerializer

class UserSerializer(serializers.ModelSerializer):

    # using TaskSerializer() instead of HyperlinkedModelSerializer
    # https://stackoverflow.com/questions/20550598/django-rest-framework-could-not-resolve-url-for-hyperlinked-relationship-using
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'tasks']

