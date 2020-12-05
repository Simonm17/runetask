from rest_framework import routers

from django.urls import path, include

router = routers.DefaultRouter()
# router.register(r'applicant', viewsets.ApplicantViewSet)

urlpatterns = [
    path('', include(router.urls))
]