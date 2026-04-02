# Guide de déploiement sur Fly.io

## Prérequis

1. **Installer Fly CLI** :

   ```bash
   # macOS
   brew install flyctl

   # Linux/WSL
   curl -L https://fly.io/install.sh | sh
   ```

2. **Créer un compte Fly.io** :
   ```bash
   flyctl auth signup
   # ou si vous avez déjà un compte
   flyctl auth login
   ```

## Déploiement

1. **Initialiser l'application** :

   ```bash
   flyctl apps create cv-redouane-azmani
   ```

2. **Déployer l'application** :

   ```bash
   flyctl deploy
   ```

3. **Vérifier le déploiement** :
   ```bash
   flyctl status
   flyctl open
   ```

## Commandes utiles

- **Voir les logs** :

  ```bash
  flyctl logs
  ```

- **Redéployer après modifications** :

  ```bash
  flyctl deploy
  ```

- **Voir les informations de l'app** :

  ```bash
  flyctl info
  ```

- **Configurer un domaine personnalisé** :
  ```bash
  flyctl certs create your-domain.com
  ```

## Configuration actuelle

- **App name** : `cv-redouane-azmani'
- **Région** : `cdg` (Paris, France)
- **Port** : 80 (HTTP interne, HTTPS externe)
- **RAM** : 256MB
- **CPU** : 1 core partagé

## URL de déploiement

Après déploiement, votre CV sera accessible à :
`https://cv-redouane-azmani.fly.dev`

## Coût

- Avec la configuration actuelle (256MB RAM, auto-sleep), l'application restera dans le tier gratuit de Fly.io
- L'app se met automatiquement en veille quand elle n'est pas utilisée
- Redémarrage automatique lors d'une visite

## Mise à jour

Pour mettre à jour votre CV :

1. Modifiez vos fichiers localement
2. Exécutez `flyctl deploy`
3. Votre site sera mis à jour automatiquement
