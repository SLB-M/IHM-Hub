const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const dataPath = './data.json';
const SECRET = "monSuperSecretÀChanger"; // tu pourras le mettre dans un .env plus tard

// Lire les données depuis le fichier JSON
function lireDonnees() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ utilisateurs: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dataPath));
}

// Écrire dans le fichier JSON
function ecrireDonnees(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ✅ Inscription avec création du token
app.post('/inscription', async (req, res) => {
    const { email, prenom, password } = req.body;
    const donnees = lireDonnees();

    const utilisateurExiste = donnees.utilisateurs.find(user => user.email === email);
    if (utilisateurExiste) {
        return res.status(400).send({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nouvelUtilisateur = { email, prenom, password: hashedPassword };
    donnees.utilisateurs.push(nouvelUtilisateur);
    ecrireDonnees(donnees);

    const token = jwt.sign({ email: nouvelUtilisateur.email }, SECRET, { expiresIn: '2h' });

    res.status(201).send({ message: "Inscription réussie !" , token, prenom: nouvelUtilisateur.prenom });
});


// ✅ Connexion avec vérification du mot de passe
app.post('/connexion', async (req, res) => {
    const { email, password } = req.body;
    const donnees = lireDonnees();
    const utilisateur = donnees.utilisateurs.find(user => user.email === email);

    if (!utilisateur) {
        return res.status(401).send({ message: "Email ou mot de passe invalide." });
    }

    const passwordValide = await bcrypt.compare(password, utilisateur.password);
    if (!passwordValide) {
        return res.status(401).send({ message: "Email ou mot de passe invalide." });
    }

    const token = jwt.sign({ email: utilisateur.email }, SECRET, { expiresIn: '2h' });

    res.send({ message: "Connexion réussie !", token, prenom: utilisateur.prenom });
});

// Route de test
app.get('/', (req, res) => {
    res.send('Serveur IHM Hub fonctionnel');
});

app.listen(port, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
