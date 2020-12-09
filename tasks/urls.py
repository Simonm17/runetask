from rest_framework import routers

from django.urls import path, include

from .api import viewsets


# how to use when reverse():
# e.g. reverse('tasks:detail')
# how to use in django templates:
# e.g. {% url 'tasks:detail' %}
app_name = 'tasks'

""" Notes:
    - Routers are used for ViewSets.
    - If using generic api views, you can use regular urlpatterns,
        e.g. path('', views.APIListView.as_view()).
    
"""

router = routers.DefaultRouter()
router.register(r'', viewsets.TaskViewSet)

urlpatterns = [
    path('', include(router.urls))
]