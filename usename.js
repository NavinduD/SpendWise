
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
  

firebase.initializeApp(firebaseConfig);

var signOutButton = document.getElementById("signOutButton");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const currentUserUid = user.uid;
      const userDocRef = firebase.firestore().collection("users").doc(currentUserUid);
  
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          const firstName = doc.data().firstName;
          document.getElementById("user-first-name").innerHTML = firstName;
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    } else {
      console.log("User is not logged in.");
    }
  });
  

// Add a click event listener to the sign-out button
signOutButton.addEventListener("click", function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("User signed out successfully.");
        window.location.href = "index.html";
    }).catch(function (error) {
        // An error happened.
        console.error("Error signing out:", error);
    });
});

// Get the clickable text element
const clickableText = document.querySelector('.clickable-text');
    
// Get the slide down window element
const slideDown = document.querySelector('.slide-down');

// Add a click event listener to the clickable text
clickableText.addEventListener('click', () => {
  // If the slide down window is currently hidden, show it
  if (slideDown.style.display === 'none') {
    slideDown.style.display = 'block';
  } else { // Otherwise, hide it
    slideDown.style.display = 'none';
  }
});










