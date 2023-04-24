// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCXiCdLnZ_gZpVpHBQNPFfHr5aeqh5ZcBY",
  authDomain: "spend-wise-25081.firebaseapp.com",
  databaseURL: "https://spend-wise-25081-default-rtdb.firebaseio.com",
  projectId: "spend-wise-25081",
  storageBucket: "spend-wise-25081.appspot.com",
  messagingSenderId: "1010726655588",
  appId: "1:1010726655588:web:0ac8a91b84e8eb7b853171",
  measurementId: "G-PY8Y41XD8Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is already signed in, redirect to home page
    window.location.href = "home.html";
  }
});

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('signinBtn');


signinBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Redirect to the home page
      window.location.href = 'home.html';
    })
    .catch((error) => {
      // Handle sign-in errors
      console.error(error);
      alert(error.message);
    });
});