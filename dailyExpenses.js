const income = document.getElementById("monthly-income");
const save = document.getElementById("savings");
const expensePerDay = document.getElementById("daily-expenses");
const expensesForm = document.getElementById("add-expense-form");


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUserUid = user.uid;
    const userDocRef = firebase.firestore().collection("users").doc(currentUserUid);
    const dailyRef = firebase.firestore().collection("expenses").doc(currentUserUid);
    const currentDay = "day" + new Date().getDate();

    dailyRef.get().then((doc) => {
      if (doc.exists && doc.data().hasOwnProperty(currentDay)) {
        expensesForm.classList.add('hidden');
      } else {
        expensesForm.classList.remove('hidden');
      }
    });

    userDocRef.get().then((doc) => {
      if (doc.exists) {
        const income = doc.data().Monthly_income;
        const save = doc.data().Saving;

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const daysInMonth = new Date(year, month, 0).getDate();

        const dailyExpense = (income - save) / daysInMonth;

        document.getElementById("monthly-income").innerHTML = `Rs. ${income.toFixed(2)}`;
        document.getElementById("savings").innerHTML = `Rs. ${save.toFixed(2)}`;
        document.getElementById("daily-expenses").innerHTML = `Rs. ${dailyExpense.toFixed(2)}`;
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

var database = firebase.database();

var addExpenseForm = document.getElementById('add-expense-form');
addExpenseForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the expense amount from the form
  var expenseAmount = document.getElementById('expense-amount').value;
  // Get the current day of the month
  const currentDay = "day" + new Date().getDate();


  firebase.auth().onAuthStateChanged((user) => {
    var uid = user.uid;

    firebase.firestore().collection('expenses').doc(uid).set({
      [currentDay]: expenseAmount,
    }).then(function () {
      console.log("Updated doc");
    }).catch(function (error) {
      console.error("Error updating to user document: ", error);
    })
  });

});


var savebtn = document.getElementById('saveUpbtn');
var saveUpdate = document.getElementById('saveUpdate');

var incomeUpdate = document.getElementById('incomeUpdate');
var inbtn = document.getElementById('inUpbtn');

savebtn.addEventListener('click', function (event) {
  event.preventDefault();
  firebase.auth().onAuthStateChanged((user) => {
    var uid = user.uid;

    firebase.firestore().collection('users').doc(uid).update({
      Saving: parseFloat(saveUpdate.value),
    }).then(function () {
      console.log("Updated doc");
    }).catch(function (error) {
      console.error("Error updating to user document: ", error);
    })
  });
})

inbtn.addEventListener('click', function (event) {
  event.preventDefault();
  firebase.auth().onAuthStateChanged((user) => {
    var uid = user.uid;

    firebase.firestore().collection('users').doc(uid).update({
      Monthly_income: parseFloat(incomeUpdate.value),
    }).then(function () {
      console.log("Updated doc");
    }).catch(function (error) {
      console.error("Error updating to user document: ", error);
    })
  });
})
