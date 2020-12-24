import uuid as uuid_lib

from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    description = models.CharField(max_length=250, blank=True)
    uuid = models.UUIDField(
        db_index=True,
        default=uuid_lib.uuid4,
        editable=False
    )
    completed = models.BooleanField(default=False)
    # use related_name to link relationships for hyperlinkrelationship serializer later on
    # https://stackoverflow.com/questions/42436976/django-rest-framework-attributeerror-user-object-has-no-attribute-books
    created_by = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.created_by}, {self.description}'