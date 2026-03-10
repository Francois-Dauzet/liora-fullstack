import os
import dj_database_url
from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*'] # Permissif pour éviter l'erreur 400 Bad Request lié au Host header

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}

CORS_ALLOW_ALL_ORIGINS = True # On autorise tout pour débloquer le frontend
CORS_ALLOWED_ORIGINS = [] # Laissé vide car on utilise True ci-dessus

# Config Whitenoise pour la mise en cache statique en production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
