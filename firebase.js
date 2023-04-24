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

// Get a reference to the Firebase authentication service
const auth = firebase.auth();

// Get a reference to the Firebase Firestore service
const db = firebase.firestore();

// Get a reference to the sign-up form
const signupForm = document.getElementById('signup-form');

// Add an event listener to the sign-up form submit button
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the form data
    const firstName = signupForm['firstName'].value;
    const lastName = signupForm['lastName'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    // Create a new user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Add the user's first name and last name to the users collection in Firestore
            db.collection('users').doc(userCredential.user.uid).set({
                firstName,
                lastName
            })
                .then(() => {
                    // User added successfully, redirect to home page
                    window.location.href = 'home.html';
                })
                .catch((error) => {
                    console.error(error);
                    alert('There was an error adding your user information. Please try again later.');
                });
        })
        .catch((error) => {
            console.error(error);
            alert('There was an error creating your account. Please check your information and try again.');
        });
});