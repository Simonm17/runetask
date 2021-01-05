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
    1. React calls OAuth2 login view via 
        allauth.socialaccount.providers.twitch.views.oauth2_login
    2. Twitch OAuth2 login page returns. User enters login information 
        and is then redirected to TwitchConnect class view.
    3. TwitchConnect uses returned code, authenticates user in backend, and returns back token/key.
        Key then is passed as params to twitch_callback to be used by frontend authentication.
    4. twitch_callback returns code to frontend using params.
    NOTE: recomment later. not the correct flow.
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

