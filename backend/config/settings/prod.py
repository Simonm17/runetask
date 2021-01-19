import django_heroku

from .base import *
from django.conf import settings


DEBUG = False

ALLOWED_HOSTS = [
    'runetask-backend.herokuapp.com'
]

CORS_ALLOWED_ORIGINS = [
    # add frontend website here
]

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

django_heroku.settings(locals())