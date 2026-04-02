import express from 'express';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Configuration pour obtenir __dirname en modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Log de démarrage avec configuration
console.log('Configuration de l\'application...');
console.log(`Port configuré: ${PORT}`);
console.log(`Email utilisateur configuré: ${process.env.EMAIL_USER ? 'Oui' : 'Non'}`);
console.log(`Mot de passe email configuré: ${process.env.EMAIL_PASS ? 'Oui' : 'Non'}`);

// Middleware pour servir les fichiers statiques
app.use(express.static(join(__dirname, '')));
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use(express.json());

// Configuration de Nodemailer pour l'envoi d'emails
console.log('Configuration de Nodemailer...');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Vérifier la configuration du transporteur
transporter.verify(function(error, success) {
    if (error) {
        console.error('Erreur de configuration du transporteur:', error);
    } else {
        console.log('Serveur prêt à envoyer des emails');
    }
});

// Route pour envoyer un email via formulaire de contact
app.post('/send-email', async (req, res) => {
    console.log('Nouvelle requête de contact reçue');
    const { name, email, message } = req.body;

    // Log des données reçues
    console.log('Données du formulaire:', {
        name,
        email,
        messageLength: message ? message.length : 0
    });

    // Vérification des données requises
    if (!name || !email || !message) {
        console.error('Données manquantes dans le formulaire');
        return res.status(400).json({ error: 'Toutes les données sont requises' });
    }

    try {
        console.log('Tentative d\'envoi d\'email...');
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "redazmani9@gmail.com",
            subject: `Contact Portfolio - Message de ${name}`,
            text: `
                Nom: ${name}
                Email: ${email}
                Message: ${message}
            `,
            html: `
                <h3>Nouveau message du portfolio</h3>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        // Nouveau log plus visible pour confirmer l'envoi
        console.log(`
        ================================
        ✅ MESSAGE ENVOYÉ AVEC SUCCÈS !
        👤 De: ${name}
        📧 Email: ${email}
        🆔 MessageID: ${info.messageId}
        ⏰ Heure: ${new Date().toLocaleString()}
        ================================
        `);

        res.status(200).json({
            message: 'Email envoyé avec succès',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Erreur détaillée lors de l\'envoi de l\'email:', {
            error: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({
            error: 'Erreur lors de l\'envoi de l\'email',
            details: error.message
        });
    }
});

// Route principale pour servir le fichier index.html
app.get('/', (req, res) => {
    console.log('Page d\'accueil demandée');
    res.sendFile(join(__dirname, 'index.html'));
});

// Route pour récupérer les certificats
app.get('/docs/:certificat', (req, res) => {
    const { certificat } = req.params;
    console.log(`Demande de certificat: ${certificat}`);

    const filePath = join(__dirname, 'docs', certificat);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du certificat:', {
                certificat,
                error: err.message
            });
            res.status(404).send('Fichier non trouvé');
        } else {
            console.log(`Certificat envoyé avec succès: ${certificat}`);
        }
    });
});

app.use('/public', express.static(join(__dirname, 'public')));

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`
    =================================
    🚀 Serveur démarré avec succès
    🌍 Port: ${PORT}
    📧 Email configuré: ${process.env.EMAIL_USER}
    ⏰ ${new Date().toLocaleString()}
    =================================
    `);
});