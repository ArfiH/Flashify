import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.12/firebase-auth.js";

const auth = getAuth();

const mainView = document.getElementById("main-view");

const logInForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginErrorMessage = document.getElementById("login-error-message");
const needAnAccountBtn = document.getElementById("need-an-account-btn");

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");
const signUpFormView = document.getElementById("signup-form");
const haveAnAccountBtn = document.getElementById("have-an-account-btn");

const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");
const logOutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    logInForm.style.display = "none";
    userProfileView.style.display = "block";
    UIuserEmail.innerHTML = user.email;
  } else {
    logInForm.style.display = "block";
    userProfileView.style.display = "none";
  }
  mainView.classList.remove("loading");
});

const signUpButtonPressed = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log(userCredential);
  } catch (error) {
    console.log(error.code);
    UIErrorMessage.innerHTML = formatErrorMessage(error.code, "signup");
    UIErrorMessage.classList.add("visible");
  }
};

const logOutButtonPressed = async () => {
  try {
    await signOut(auth);
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log(error);
  }
};

const loginButtonPressed = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
  } catch (error) {
    console.log(error.code);
    console.log(formatErrorMessage(error.code, "login"));
    loginErrorMessage.innerHTML = formatErrorMessage(error.code, "login");
    loginErrorMessage.classList.add("visible");
  }
};

const needAnAccountButtonPressed = () => {
  logInForm.style.display = "none";
  signUpFormView.style.display = "block";
};

const haveAnAccountButtonPressed = () => {
  logInForm.style.display = "block";
  signUpFormView.style.display = "none";
};

signUpBtn.addEventListener("click", signUpButtonPressed);
haveAnAccountBtn.addEventListener("click", haveAnAccountButtonPressed);
logOutBtn.addEventListener("click", logOutButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);
needAnAccountBtn.addEventListener("click", needAnAccountButtonPressed);

const formatErrorMessage = (errorCode, action) => {
  let message = "";
  if (action === "signup") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-email"
    ) {
      message = "Please enter a valid email";
    } else if (
      errorCode === "auth/missing-password" ||
      errorCode === "auth/weak-password"
    ) {
      message = "Password must be at least 6 characters long";
    } else if (errorCode === "auth/email-already-in-use") {
      message = "Email is already taken";
    }
  } else if (action === "login") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-password"
    ) {
      message = "Email or Password is incorrect";
    } else if (errorCode === "auth/user-not-found") {
      message = "Our system was unable to verify your email or password";
    }
  }

  return message;
};
