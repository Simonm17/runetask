from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Task


class TestTaskModel(TestCase):

    def setUp(self):
        user = User.objects.get_or_create(
            username='TestUser1',
            email='testuser1@company.com'
        )
        Task.objects.get_or_create(
            description="This is a description.",
            created_by=user[0]
        )

    def test_task_is_created(self):
        task_1 = Task.objects.get(description='This is a description.')
        self.assertEqual(task_1.description, 'This is a description.')
        self.assertIsNotNone(task_1)