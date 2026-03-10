# Soutenance - Déploiement projet "TODO List"

## Liens de l'application

- **Site Final (Frontend) :** https://liora-fullstack.vercel.app/
- **API (Backend) :** https://liora-fullstack.onrender.com/
- **Code source (GitHub) :** https://github.com/Francois-Dauzet/liora-fullstack

## 1. Preuves de la partie 1 et 2 (Déploiement)

Le projet utilise de bonnes pratiques de configuration :

- Paramétrage de `settings/` scindé en `base.py`, `development.py`, `production.py`.
- L'utilisation de `python-dotenv` pour les secrets.
- Intégration de `gunicorn`, `whitenoise` et un backend `PostgreSQL` via `psycopg2-binary` (cf. `requirements.txt`).
- Le FrontEnd a le lien dynamique qui ponte vers l'API, avec du SEO rajouté (`<meta name="description">`).

## 2. Preuve du monitoring de disponibilité (UptimeRobot)

Vous trouverez ci-joint la capture d'écran de l'UptimeRobot configuré sur le Web Service du backend :
_(Insérez la capture d'écran du Dashboard UptimeRobot pointant sur la route `/health/` ici)_

## 3. Preuve du monitoring d'erreurs (Sentry)

Les configurations Sentry ont été complétées pour les deux architectures en utilisant des variables d'environnement (`SENTRY_DSN` & `VITE_SENTRY_DSN`). Des triggers ont été implémentés dans le code pour soulever les erreurs.

### A. Erreur Backend (Django)

L'erreur "Division by zero" a été générée en utilisant l'URL `/sentry-debug/`.
_(Insérez la capture d'écran Dashboard Sentry : Issue details, Trace de division_by_zero dans views ou urls)_

### B. Erreur Frontend (React)

L'erreur de test a été levée en cliquant sur le bouton « Vérifier Sentry » via le composant `App.jsx`.
_(Insérez la capture d'écran Dashboard Sentry React : Issue details affichant "Test Sentry Error from React")_
