

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        firebase.firestore().collection("users").doc(user.uid).get().then(function (doc) {
            if (doc.exists && doc.data().wealth_score) {
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
                // If the user hasn't added a wealth score yet, load the questions.
                loadQuestions();
            }
        }).catch(function (error) {
            console.log("Error getting user document: ", error);
        });
    } else {
        // User is not signed in.
        console.log("User is not signed in.");
    }
});

function loadQuestions(){
    form.style.display = 'block';
};



