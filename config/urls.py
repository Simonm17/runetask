from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('nimda/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('tasks/', include('tasks.urls')),
    path('users/', include('users.urls')),
]
