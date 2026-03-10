import os
import dj_database_url
from .base import *

DEBUG = False

ALLOWED_HOSTS = [host.strip().replace('https://', '').replace('http://', '').rstrip('/') for host in os.environ.get('ALLOWED_HOSTS', '*').split(',') if host.strip()]

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [origin.strip().rstrip('/') for origin in os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',') if origin.strip()]

# Config Whitenoise pour la mise en cache statique en production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
