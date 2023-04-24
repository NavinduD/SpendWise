

const auth = firebase.auth();

const db = firebase.firestore();


const form = document.querySelector('#wealth-form');
const resultContainer = document.getElementById('result-container');
const submitBtn = document.getElementById('submit-btn');
const result = document.getElementById('result');

const formContainer = document.getElementById("form-container");



// add event listener to submit button
document.getElementById("submit-btn").addEventListener("click", function (event) {
    event.preventDefault();

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    const q6 = document.querySelector('input[name="q6"]:checked');
    const q7 = document.querySelector('input[name="q7"]:checked');
    const q8 = document.querySelector('input[name="q8"]:checked');
    const q9 = document.querySelector('input[name="q9"]:checked');
    const q10 = document.querySelector('input[name="q10"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10) {
        alert('Please answer all questions.');
        return;
    }

    // calculate score and determine wealth level
    let score = 0;
    if (q1 == true) {
        score += parseInt(q1.value);
    }
    if (q2) {
        score += parseInt(q2.value);
    }
    if (q3) {
        score += parseInt(q3.value);
    }
    if (q4) {
        score += parseInt(q4.value);
    }
    if (q5) {
        score += parseInt(q5.value);
    }
    if (q6) {
        score += parseInt(q6.value);
    }
    if (q7) {
        score += parseInt(q7.value);
    }
    if (q8) {
        score += parseInt(q8.value);
    }
    if (q9) {
        score += parseInt(q9.value);
    }
    if (q10) {
        score += parseInt(q10.value);
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in, so get their UID
            var uid = user.uid;

            // Add the score to the user's document in the 'users' collection
            firebase.firestore().collection('users').doc(uid).update({
                wealth_score: score
            }).then(function () {
                console.log("Score added to user document!");
            }).catch(function (error) {
                console.error("Error adding score to user document: ", error);
            });

        } else {
            // User is not signed in
            console.log("User is not signed in.");
        }
        db.collection("users").doc(uid).get().then((doc) => {
            if (doc.exists) {
                const wealthScore = doc.data().wealth_score;
                console.log("The user's wealth score is:", wealthScore);
                if (wealthScore < 15) {
                    document.getElementById('result').innerHTML = "Your wealth level is: Low";

                } else if (wealthScore >= 15 && wealthScore < 30) {
                    document.getElementById('result').innerHTML = "Your wealth level is: Moderate";
                } else {
                    document.getElementById('result').innerHTML = "Your wealth level is: High";
                };
                form.style.display = 'none';
                resultContainer.style.display = 'block';
            } else {
                console.log("No such document!");
            }
        });
    });





})