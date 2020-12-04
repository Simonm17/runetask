from .base import *
from django.conf import settings

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS += [
    'debug_toolbar',
]

if DEBUG:
    MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.abspath(os.path.join(BASE_DIR, 'static')),
    # BASE_DIR / "static",  # same thing as above
]

