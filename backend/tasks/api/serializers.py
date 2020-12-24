from rest_framework import serializers

from django.contrib.auth.models import User
from ..models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    # NOTE: replaced by extra_kwargs
    # created_by = serializers.HyperlinkedIdentityField(
    #   view_name='users:user-detail'
    # )

    # override User pk with username
    created_by = serializers.PrimaryKeyRelatedField(source='created_by.username', read_only=True)

    class Meta:
        model = Task
        fields = ['url', 'description', 'uuid', 'completed', 'created_by', 'created_date', 'updated_date']
        extra_kwargs = {
            'url': {'view_name': 'tasks:task-detail', 'lookup_field': 'uuid'},
            'created_by': {'view_name': 'users:user-detail'},
        }