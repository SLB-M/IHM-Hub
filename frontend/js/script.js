const serverURL = 'http://localhost:3000';

// === POPUPS ===
const loginPopup = document.getElementById('login-popup');
const registerPopup = document.getElementById('register-popup');
const signupConfirmPopup = document.getElementById('signup-confirm-popup');
const signupConfirmTitle = document.getElementById('signup-confirm-title');
const signupConfirmMessage = document.getElementById('signup-confirm-message');
const loginConfirmPopup = document.getElementById('login-confirm-popup');
const loginConfirmTitle = document.getElementById('login-confirm-title');
const loginConfirmMessage = document.getElementById('login-confirm-message');

// === UTILITAIRES ===
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// === FONCTIONS GÉNÉRALES POPUPS ===
function showLoginPopup() {
  closeAllPopups();
  loginPopup?.classList.remove('hidden');
}

function showRegisterPopup() {
  closeAllPopups();
  registerPopup?.classList.remove('hidden');
}

function showHeaderLoginPopup() {
  closeAllPopups();
  document.getElementById('header-login-popup')?.classList.remove('hidden');
}

function showSignupConfirmation(prenom) {
  closeAllPopups();
  signupConfirmTitle.textContent = `Bienvenue, ${prenom}`;
  signupConfirmMessage.innerHTML = "Ton compte a été créé avec succès.<br>Bienvenue dans l'univers UX/UI.";
  signupConfirmPopup?.classList.remove('hidden');
}

function showLoginConfirmation(prenom) {
  closeAllPopups();
  loginConfirmTitle.textContent = `Bienvenue, ${prenom}`;
  loginConfirmMessage.innerHTML = "Tu es bien connecté·e.<br>Profite pleinement de l’expérience IHM Hub !";
  loginConfirmPopup?.classList.remove('hidden');
}

function closeAllPopups() {
  document.querySelectorAll('.modal').forEach(popup => popup.classList.add('hidden'));
  document.querySelectorAll('.form-error').forEach(err => err.textContent = '');
  document.querySelectorAll('.modal input').forEach(input => input.value = '');
}

// === METTRE À JOUR LE HEADER APRÈS CONNEXION ===
function mettreAJourHeaderConnecte(prenom) {
  const headerUser = document.getElementById('header-user');
  const guestButtons = document.getElementById('guest-buttons');
  const userNameSpan = document.getElementById('user-name');
  const dropdownUsername = document.getElementById('dropdown-username');

  if (prenom) {
    localStorage.setItem('ihmhubPrenom', prenom);
    headerUser?.classList.remove('hidden');
    guestButtons?.classList.add('hidden');
    if (userNameSpan) userNameSpan.textContent = prenom;
    if (dropdownUsername) dropdownUsername.textContent = prenom;
  }
}

// === AJOUTER À MES OUTILS ===
document.querySelectorAll('.add-tool-btn').forEach(button => {
  button.addEventListener('click', () => {
    const token = localStorage.getItem('ihmhubToken');
    const prenom = localStorage.getItem('ihmhubPrenom');
    if (token && prenom) {
      showLoginConfirmation(prenom);
    } else {
      showLoginPopup();
    }
  });
});

// === CONNEXION STANDARD ===
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();
    const errorMsg = document.getElementById('login-popup-error-msg');

    if (!isValidEmail(email)) return errorMsg.textContent = "Adresse email invalide.";
    if (password.length < 6) return errorMsg.textContent = "Mot de passe trop court.";

    try {
      const res = await fetch(`${serverURL}/connexion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('ihmhubToken', data.token);
        mettreAJourHeaderConnecte(data.prenom);
        showLoginConfirmation(data.prenom);
      } else {
        errorMsg.textContent = data.message || "Identifiants incorrects.";
      }
    } catch (error) {
      errorMsg.textContent = "Erreur serveur. Réessaie plus tard.";
    }
  });
}

// === CONNEXION HEADER ===
const headerLoginForm = document.getElementById('header-login-form');
if (headerLoginForm) {
  headerLoginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();
    const errorMsg = document.getElementById('login-error-msg');

    if (!isValidEmail(email)) return errorMsg.textContent = "Adresse email invalide.";
    if (password.length < 6) return errorMsg.textContent = "Mot de passe trop court.";

    try {
      const res = await fetch(`${serverURL}/connexion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('ihmhubToken', data.token);
        localStorage.setItem('ihmhubPrenom', data.prenom);
        mettreAJourHeaderConnecte(data.prenom);
        closeAllPopups();
        showLoginConfirmation(data.prenom);
      } else {
        errorMsg.textContent = data.message || "Identifiants incorrects.";
      }
    } catch (error) {
      errorMsg.textContent = "Erreur serveur. Réessaie plus tard.";
    }
  });
}

// === INSCRIPTION ===
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const prenom = this.querySelector('input[placeholder="Prénom"]').value.trim();
    const email = this.querySelector('input[placeholder="Adresse mail"]').value.trim();
    const password = this.querySelector('input[placeholder="Mot de passe"]').value.trim();
    const confirm = this.querySelector('input[placeholder="Confirmer le mot de passe"]').value.trim();
    const errorMsg = document.getElementById('register-error-msg');

    if (!prenom) return errorMsg.textContent = "Merci d’indiquer ton prénom.";
    if (!isValidEmail(email)) return errorMsg.textContent = "Adresse email invalide.";
    if (password.length < 6) return errorMsg.textContent = "Mot de passe trop court.";
    if (password !== confirm) return errorMsg.textContent = "Les mots de passe ne correspondent pas.";

    try {
      const res = await fetch(`${serverURL}/inscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Connexion directe après inscription
        localStorage.setItem('ihmhubToken', data.token);
        localStorage.setItem('ihmhubPrenom', data.prenom);
        mettreAJourHeaderConnecte(data.prenom);
        showSignupConfirmation(data.prenom);
      } else {
        errorMsg.textContent = data.message || "Erreur d'inscription.";
      }
    } catch (error) {
      errorMsg.textContent = "Erreur serveur. Réessaie plus tard.";
    }
  });
}

// === UTILISATEUR DÉJÀ CONNECTÉ ===
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('ihmhubToken');
  const prenom = localStorage.getItem('ihmhubPrenom');
  if (token && prenom) {
    mettreAJourHeaderConnecte(prenom);
  }
});

// === MENU PROFIL ===
const profileToggle = document.getElementById('profile-toggle');
const profileMenu = document.getElementById('profile-menu');
const logoutBtn = document.getElementById('logout-btn');

profileToggle?.addEventListener('click', () => {
  profileMenu?.classList.toggle('hidden');
});

window.addEventListener('click', (e) => {
  if (!document.getElementById('profile-wrapper')?.contains(e.target)) {
    profileMenu?.classList.add('hidden');
  }
});

logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('ihmhubToken');
  localStorage.removeItem('ihmhubPrenom');
  location.reload();
});

// === MENU THÈMES ===
document.getElementById('theme-toggle')?.addEventListener('click', function (e) {
  e.stopPropagation();
  document.getElementById('theme-menu')?.classList.toggle('show');
});

window.addEventListener('click', function () {
  document.getElementById('theme-menu')?.classList.remove('show');
});

// === NEWSLETTER ===
document.querySelector('.newsletter form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    alert("Merci de saisir une adresse email valide !");
    return;
  }

  document.getElementById('newsletter-popup')?.classList.remove('hidden');
  emailInput.value = '';
});

function closeNewsletterPopup() {
  document.getElementById('newsletter-popup')?.classList.add('hidden');
}

// Bouton "Commencer la formation" avec vérification de connexion
const startCourseBtn = document.getElementById('start-course-btn');
if (startCourseBtn) {
  startCourseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const token = localStorage.getItem('ihmhubToken');
    const prenom = localStorage.getItem('ihmhubPrenom');

    if (token && prenom) {
      // Redirection si connecté
      window.location.href = 'commencer-cours.html';
    } else {
      // Affichage du popup de connexion avec message personnalisé
      const loginPopup = document.getElementById('login-popup');
      const desc = loginPopup.querySelector('.desc');
      const title = loginPopup.querySelector('h2');

      if (loginPopup && desc && title) {
        title.textContent = "Connecte-toi pour accéder à ton cours";
        desc.innerHTML = `Pour suivre cette formation, connecte-toi à ton espace IHM Hub.<br>
        Tu n'as pas encore de compte ? <a href="#" onclick="showRegisterPopup()">Crée-en un gratuitement</a>`;
        closeAllPopups();
        loginPopup.classList.remove('hidden');
      }
    }
  });
}
