# Utiliser nginx comme serveur web
FROM nginx:alpine

# Copier les fichiers du site dans le répertoire nginx
COPY public/ /usr/share/nginx/html/

# Copier les assets
COPY assets/ /usr/share/nginx/html/assets/

# Configuration nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"] 