import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyHr3QmcPsP8BjeUpZLPQ6FkjlLB_v7JU",
    authDomain: "db-tecnicusuarios.firebaseapp.com",
    projectId: "db-tecnicusuarios",
    storageBucket: "db-tecnicusuarios.appspot.com",
    messagingSenderId: "500178473738",
    appId: "1:500178473738:web:916af8899ffcef0a5420f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Verifica si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    
    if (user) {
        console.log("Usuario autenticado:", user);

        // Si el usuario está autenticado y está en la página de inicio de sesión, redirige al inicio
        if (currentPage === 'index.html' || currentPage === '') {
            window.location.href = 'inicio.html';
        }

    } else {
        console.log("Usuario no autenticado. Verificando página...");

        // Si no está autenticado y está intentando acceder a una página diferente de la de inicio de sesión, redirige a index.html
        if (currentPage !== 'index.html') {
            window.location.href = 'index.html';
        }
    }
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario autenticado:", user);
            window.location.href = './inicio.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error de autenticación:", errorCode, errorMessage);
            console.log(error.message);
            console.log(error.code);
            if (error.code === 'auth/invalid-credential') {
                window.alert('Nombre y contraseña incorrectas');
            }
        });
});

const cerrarSesion = () => {
    signOut(auth)
        .then(() => {
            console.log('Sesión cerrada exitosamente.');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
};
