from django.contrib.auth.models import User
from rest_framework import serializers
from tasks.models import Task
from tasks.api.serializers import TaskSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):

    # NOTE: lines 10-17 can be replaced with using extra_kwargs in class Meta.
    # using TaskSerializer() instead of HyperlinkedModelSerializer
    # https://stackoverflow.com/questions/20550598/django-rest-framework-could-not-resolve-url-for-hyperlinked-relationship-using
    # tasks = TaskSerializer(many=True, read_only=True)
    # tasks = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='tasks:task-detail',
    # )

    class Meta:
        model = User
        fields = ['url', 'username', 'tasks']

        # need to overwrite default view_name='user-detail' because app_name
        # NOTE: if you use serializer.HyperlinkedIdentityField outside of meta,
        # it will assign to wrong user and instead index the user correlating to task id.
        extra_kwargs = {
            'url': {'view_name': 'users:user-detail', 'lookup_field': 'username'},
            'tasks': {'view_name': 'tasks:task-detail', 'lookup_field': 'uuid'}
        }

