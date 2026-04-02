# Portfolio

Un portfolio moderne avec des effets WebGL et une esthétique cyberpunk, développé avec Node.js et Express.

## 🚀 Fonctionnalités

- Design avec effets de glitch et néons
- Effets WebGL interactifs
- Carrousel 3D pour la présentation des projets
- Système de particules interactif
- Formulaire de contact fonctionnel avec NodeMailer
- Animations et transitions fluides
- Curseur personnalisé
- Écran de chargement animé
- Responsive design

## 🛠 Technologies Utilisées

- **Frontend**
  - HTML5
  - CSS3 (Animations, Flexbox, Grid)
  - JavaScript (ES6+)
  - WebGL pour les effets visuels
  - Particles.js pour les effets de particules

- **Backend**
  - Node.js
  - Express.js
  - Nodemailer pour l'envoi d'emails
  - dotenv pour la gestion des variables d'environnement

## 📁 Structure du Projet

```
redouane-main/
├── assets/
│   ├── css/
│   │   ├── about.css
│   │   ├── animations.css
│   │   ├── carousel.css
│   │   ├── certif.css
│   │   ├── cv-page.css
│   │   ├── main.css
│   │   └── test.css
│   ├── images/
│   │   ├── certifications/
│   │   └── projets/
│   └── js/
│       ├── about.js
│       ├── carousel.js
│       ├── certif.js
│       ├── loading.js
│       ├── main.js
│       ├── particles-config.js
│       ├── typing.js
│       └── webgl_projects.js
├── public/
│   └── docs/
├── node_modules/
├── .env
├── index.html
├── cv.html
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation

1. Clonez le repository

```bash
git clone https://github.com/votre-username/portfolio-cyberpunk.git
```

2. Installez les dépendances

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
PORT=3000
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application
```

4. Démarrez le serveur

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 📧 Configuration Email

Pour que le formulaire de contact fonctionne, vous devez :

1. Avoir un compte Gmail
2. Activer l'authentification à deux facteurs
3. Générer un mot de passe d'application
4. Utiliser ce mot de passe dans votre fichier `.env`

## 🎨 Personnalisation

### Couleurs

Les variables de couleurs sont définies dans `main.css` :

```css
:root {
  --neon-primary: #0ff;
  --neon-secondary: #f0f;
  --neon-accent: #93f;
  --dark-bg: #000;
  --darker-bg: #050507;
}
```

### Projets

Modifiez le carrousel dans `index.html` pour ajouter/modifier vos projets.

### Certifications

Ajoutez vos certifications dans le dossier `assets/images/certifications/` et mettez à jour la section correspondante dans `index.html`.

### CV

Ajoutez votre CV dans le dossier `public/docs/` et mettez à jour la section correspondante dans `index.html`.

## 📱 Compatibilité

- Chrome (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Edge (dernières versions)
- Responsive sur mobile et tablette

## 📝 License

ISC

## 👤 Contact

Redouane AZMANI

- Email: redazmani9@gmail.com
- LinkedIn: [Redouane AZMANI](https://www.linkedin.com/in/redouane-azmani-023b4a329/)
