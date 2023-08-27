
const calculateBtn = document.getElementById('calculate-btn');
const resultsDiv = document.getElementById('results');

const calculatebtn = document.querySelector('#calculate-btn');
const appear = document.querySelector('.appear');

appear.style.display = 'none';

calculateBtn.addEventListener('click', () => {
  const income = parseFloat(document.getElementById('income').value);
  const house = parseFloat(document.getElementById('house').value);
  const food = parseFloat(document.getElementById('food').value);
  const transportation = parseFloat(document.getElementById('transportation').value);
  const health = parseFloat(document.getElementById('health').value);
  const debt = parseFloat(document.getElementById('debt').value);
  const taxes = parseFloat(document.getElementById('taxes').value);
  const savings = parseFloat(document.getElementById('savings').value);

  const cexpenses = house + food + transportation + health + debt + taxes;


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in, so get their UID
      var uid = user.uid;

      firebase.firestore().collection('users').doc(uid).update({
        Monthly_income: income,
        Compulsory_expenses: cexpenses,
        Saving: savings
      }).then(function () {
        console.log("Updated doc");
      }).catch(function (error) {
        console.error("Error updating to user document: ", error);
      });

    } else {
      // User is not signed in
      console.log("User is not signed in.");
    }
  });

  if ((cexpenses < income * 0.5) && (savings <= income * 0.2)) {
    const remainingToSave = income * 0.5 - cexpenses;
    const ncexpenses = income * 0.3;
    const totalExpenses = cexpenses + ncexpenses;

    updateChart(cexpenses, ncexpenses, savings);

    resultsDiv.innerHTML =
      '<p>You are doing great! You can save Rs.' + savings.toFixed(2) + ' every month.</p><br>' +
      '<p>Your non-compulsory expenses should be less than or equal Rs.' + ncexpenses.toFixed(2) + '.</p><br>' +
      '<p>Your total expenses are less than or equal Rs.' + totalExpenses.toFixed(2) + '.</p><br>' +
      '<p>You can save Rs.' + remainingToSave.toFixed(2) + ' more if you want to.</p>';

  } else if ((cexpenses >= income * 0.5) && (cexpenses <= (income-savings)) && (savings <= income * 0.2)) {
    const remain = cexpenses - income * 0.5;
    const ncexpenses = income * 0.3 - remain + (income * 0.2 - savings);

    updateChart(cexpenses, ncexpenses, savings);

    resultsDiv.innerHTML =
      '<p>You can save Rs.' + savings.toFixed(2) + ' every month.</p><br>' +
      '<p>Your non-compulsory expenses should be Rs.' + ncexpenses.toFixed(2) + '.</p><br>' +
      '<p>It is still possible to save 20% of your income by reducing unnecessary expenses, increasing your income, or finding ways to reduce the costs of your compulsory expenses.</p><br>';
  } else if ((cexpenses >= income * 0.5) && (savings > income * 0.2) && ((cexpenses+savings) <= income)) {

    const ncexpenses = income - cexpenses - savings;

    updateChart(cexpenses, ncexpenses, savings);

    resultsDiv.innerHTML =
      '<p>It is difficult to save Rs.' + savings + ' now but it is still possible.</p><br>' +
      '<p>You may need to reassess your expenses and find ways to cut down on unnecessary spending in order to make more room for savings.</p>'
  } else if ((cexpenses < income * 0.5) && (savings > income * 0.2) && ((cexpenses+savings) <= income)) {
    const ncexpenses = income * 0.3;
    const remainingToSave = (income * 0.5) - cexpenses;
    const possible = (remainingToSave + (income * 0.2)) - savings;
    const totalExpenses = cexpenses + ncexpenses;

    updateChart(cexpenses, ncexpenses, savings);

    if (possible >= 0) {
      resultsDiv.innerHTML =
        '<p>You are doing great! You can save Rs.' + savings.toFixed(2) + ' every month.</p><br>' +
        '<p>Your non-compulsory expenses should be less than or equal Rs.' + ncexpenses.toFixed(2) + '.</p><br>' +
        '<p>Your total expenses are less than or equal Rs.' + totalExpenses.toFixed(2) + '.</p><br>' +
        '<p>You can save Rs.' + possible + ' more if you want to.</p>';
    } else {
      resultsDiv.innerHTML =
        '<p>You can save Rs.' + savings.toFixed(2) + ' but you have to manage unnecessary expenses.</p><br>' +
        '<p>Your non-compulsory expenses should be less than or equal Rs.' + ncexpenses.toFixed(2) + '.</p><br>' +
        '<p>Your total expenses are less than or equal Rs.' + totalExpenses.toFixed(2) + '.</p><br>'
    }

  }else{
    const ncexpenses = income - cexpenses;
    
    resultsDiv.innerHTML =
        '<p>You cannot save Rs.' + savings.toFixed(2) + '</p><br>'+
        '<p>Your compulsory expenses are higher than 50% of your income and you only have Rs. ' + ncexpenses.toFixed(2) + 'for your non-compulsory expenses and to save.</p><br>'+
        '<p>You can save less than or equal Rs.' + ncexpenses.toFixed(2) + '. If and only manage the non-compulsory expenses</p><br>'+
        '<p>If you want to earn more money and get tips for save money, answer the questionnaire below.</p><br>'
  }

  resultsDiv.classList.remove('hidden');


});



calculatebtn.addEventListener('click', () => {
  // If the slide down window is currently hidden, show it
  if (appear.style.display === 'none' && checkForm() == true) {
    appear.style.display = 'block';
  } else { // Otherwise, hide it
    appear.style.display = 'none';
  }
});

function checkForm() {
  var form = document.getElementById("myForm");
  var inputs = form.querySelectorAll('input[type="number"]');
  var filled = true;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      filled = false;
      break;
    }
  }
  if (filled) {
    return true;
  } else {
    alert("Please fill in all input fields");
  }
}

var dataPoints = [];

function updateChart(data1, data2, data3) {

  dataPoints = [data1, data2, data3];

  var sum = dataPoints.reduce((a, b) => a + b, 0);
  var dataPercentages = dataPoints.map((datapoint) => ((datapoint / sum) * 100).toFixed(2) + '%');

  var chartData = {
    labels: ['Compulsory Expenses', 'Unnessery Expenses', 'Save'],
    datasets: [{
      label: 'Expenses Pie Chart',
      data: dataPoints,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  var chartConfig = {
    type: 'pie',
    data: chartData,
    options: { 
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.label || '';
              if (label) {
                label += ': ';
              }
              var value = context.formattedValue;
              var percentage = dataPercentages[context.dataIndex];
              value += ' (' + percentage + ')';
              return label + value;
            }
          }
        }
      }
    },
  };

  var pieChart = new Chart(
    document.getElementById('pieChart'),
    chartConfig
  );
}




