from rest_framework import serializers

from django.contrib.auth.models import User
from ..models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    # NOTE: replaced by extra_kwargs
    # created_by = serializers.HyperlinkedIdentityField(
    #   view_name='users:user-detail'
    # )

    class Meta:
        model = Task
        fields = ['url', 'description', 'uuid', 'created_by', 'created_date', 'updated_date']
        extra_kwargs = {
            # need to overwrite default view_name='task-detail' because app_name
            'url': {'view_name': 'tasks:task-detail'},
            # need to also overwrite created_by view_name to return assigned user
            # NOTE: if you use serializer.HyperlinkedIdentityField outside of meta,
            #       it will assign to wrong user and instead index the user correlating to task id.
            'created_by': {'view_name': 'users:user-detail'}
        }