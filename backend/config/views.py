import urllib.parse

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.twitch.provider import TwitchProvider
from allauth.socialaccount.providers.twitch.views import TwitchOAuth2Adapter

from django.http import JsonResponse
from django.urls import reverse
from django.shortcuts import redirect


"""
    Twitch OAuth2 workflow using allauth ->
    1. User clicks on btn in react that routes to backend/auth/login
    2. auth/login redirects to twitch for user login
    3. twitch redirects to twitch_callback with access code
    4. twitch_callback redirects to react with access code
    5. react takes and sends access code to TwitchConnect
    6. TwitchConnect takes access code and returns auth token
    7. react now can use token to authenticate users and make API calls.
"""

class TwitchConnect(SocialLoginView):
    client_class = OAuth2Client
    adapter_class = TwitchOAuth2Adapter

    @property
    def callback_url(self):
        return self.request.build_absolute_uri(reverse('twitch_callback'))


def twitch_callback(request):
    params = urllib.parse.urlencode(request.GET)
    print(params)
    return redirect(f'http://localhost:3000/twitch/{params}')
    # using jsonresponse as a placeholder until frontend params are finished
    # return JsonResponse(params, safe=False)