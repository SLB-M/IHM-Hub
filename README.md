# IHM Hub

**IHM Hub** est une plateforme web interactive permettant aux utilisateurs de découvrir, consulter et sauvegarder des ressources pédagogiques autour de l'UX/UI design. Le projet met l'accent sur une navigation fluide, des filtres intuitifs et une expérience utilisateur engageante.

---

##  Fonctionnalités principales

* ✅ Création de compte utilisateur
* ✅ Connexion avec authentification JWT
* ✅ Popups modales stylisées (connexion, inscription, confirmation)
* ✅ Navigation dynamique : page d'accueil, ressources, formations, outils
* ✅ Ajout aux favoris / protection des actions non-authentifiées
* ✅ Filtres par niveau, type et thématique sur les formations et outils
* ✅ Formulaire d'inscription à la newsletter
* ✅ Déploiement complet avec backend Node.js sur Render

---

## 🔧 Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/SLB-M/IHM-Hub.git
cd IHM-Hub/backend
```

### 2. Installer les dépendances backend

```bash
npm install
```

### 3. Lancer le serveur

```bash
npm start
```

Le serveur se lance sur `http://localhost:3000` et sert automatiquement le frontend depuis `../frontend`.

### 4. Accès local

Ouvrez votre navigateur sur :

```
http://localhost:3000
```

---

## 🔍 Structure du projet

```text
IHM-Hub/
├── backend/             # Serveur Node.js + Express
│   ├── server.js       # Point d'entrée de l'application
│   └── data.json       # Fichier local pour stocker les utilisateurs
├── frontend/            # Fichiers statiques (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── script.js
```

---

## 🌐 Version en ligne

Le projet est déployé avec [Render](https://render.com) :

🔗 (https://ihm-hub-z1za.onrender.com/)

Toutes les fonctionnalités y sont disponibles sans installation.

---

## 🛠️ Dépendances principales

### Backend

* `express`
* `cors`
* `jsonwebtoken`
* `bcryptjs`
* `dotenv`
* `body-parser`

### Frontend (vanilla)

* HTML5, CSS3, JavaScript ES6 (aucun framework externe)

---

## 🚀 Fonctionnement technique

* Le backend Express utilise un fichier `data.json` pour simuler une base de données utilisateur.
* Les tokens JWT sont générés à la connexion et stockés localement (dans `localStorage`).
* Le frontend est servi comme dossier statique par Express : toutes les routes non API renvoient vers `index.html`.
* Des popups conditionnels s'affichent selon les actions de l'utilisateur (connexion, erreur, validation).
* Si l'utilisateur n'est pas connecté, certaines actions (accès à un cours, ajout de favoris) affichent un message bloquant.

---

## 🔧 Tests recommandés

* Création et connexion de comptes (différents profils)
* Validation des messages d'erreur (email déjà pris, mot de passe court...)
* Test des redirections conditionnelles
* Ajout de favoris, inscription à la newsletter
* Affichage dynamique des cartes (ressources, outils, moocs)

---

## 📅 Auteur

* Marlène Salhab
* Master Informatique - Intégration des Compétences
* Projet personnel et évolutif (2025)

---

## 📁 Licence

Ce projet est ouvert à des fins académiques et personnelles. Toute reproduction commerciale est interdite sans autorisation.

---

Merci d'avoir exploré IHM Hub ! N'hésitez pas à laisser une ⭐ sur GitHub si le projet vous a aidé 😊
