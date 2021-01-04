import debug_toolbar

from django.contrib import admin
from django.urls import path, include
from .views import TwitchConnect, twitch_callback
from allauth.socialaccount.providers.twitch import views as twitch_views


urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('nimda/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('twitch/connect/', TwitchConnect.as_view(), name='twitch_connect'),
    path('auth/login/', twitch_views.oauth2_login, name='twitch_login'),
    path('auth/login/callback/', twitch_callback, name='twitch_callback'),
    path('tasks/', include('tasks.urls')),
    path('users/', include('users.urls')),
]