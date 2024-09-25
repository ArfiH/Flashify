// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNbB981Mfdv-rMWExTzLfudOGOTt3A4kI",
  authDomain: "forflashify.firebaseapp.com",
  projectId: "forflashify",
  storageBucket: "forflashify.appspot.com",
  messagingSenderId: "383183997845",
  appId: "1:383183997845:web:09ff8b07fb39a8853c049c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase auth and get a reference to the service
const auth = getAuth(app);

const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");
const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");
signup_btn.addEventListener('click', createUserAccount);
signin_btn.addEventListener('click', signIn);
const auth_container = document.getElementById('auth_container');
const user_container = document.getElementById('user_container');
const user_email = document.getElementById('user_email');
const logout_btn = document.getElementById('logout_btn');
logout_btn.addEventListener('click', logout);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('Logged in');
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    // ...
  } else {
    auth_container.style.display = "block";
    user_container.style.display = "none";
    console.log('Not logged in');
    // User is signed out
    // ...
  }
});

function createUserAccount() {
  console.log(signup_email.value);
  console.log(signup_password.value);

  createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('User -> ', user);
    // ...
  })
  .catch((error) => {
    console.log('Not Registered');
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
}

function signIn() {
  console.log(signin_email.value);
  console.log(signin_password.value);

  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('User-> ', user);
    // ...
  })
  .catch((error) => {
    console.log('Not logged in');
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

// const db = getFirestore(app);
// export { app }
// export { db, collection, getDocs, Timestamp, addDoc };
// export { query, orderBy, limit, where, onSnapshot };