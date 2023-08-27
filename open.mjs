import admin from "firebase-admin";
// const openai = require("openai");
// const app = require('./apps');


// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://spend-wise-25081-default-rtdb.firebaseio.comeio.com"
});


const tipsDiv = document.getElementById("tips");

// Define wealth level ranges and tips
const wealthLevels = [
  { level: "Low", range: [0, 14], saveTip: "Create a budget and stick to it.", earnTip: "Start a side hustle or freelance gig." },
  { level: "Medium", range: [15, 29], saveTip: "Automate your savings and invest in low-cost index funds.", earnTip: "Look for opportunities to advance your career or ask for a raise." },
  { level: "High", range: [30, 100], saveTip: "Consult with a financial advisor and invest in a diversified portfolio.", earnTip: "Consider starting a business or investing in real estate." }
];

// Define function to suggest tips based on wealth level
function suggestTips(wealthScore) {
  const wealthLevel = wealthLevels.find(level => wealthScore >= level.range[0] && wealthScore <= level.range[1]);
  const saveTip = wealthLevel.saveTip;
  const earnTip = wealthLevel.earnTip;
  return `For your wealth level (${wealthLevel.level}), we suggest the following tips:\n\n- Save money: ${saveTip}\n- Earn money: ${earnTip}`;
}

// Retrieve wealth_score field from Firebase users collection
admin.firestore().collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const wealthScore = doc.data().wealth_score;
    const tips = suggestTips(wealthScore);

    // Call OpenAI's GPT-3 API to generate more detailed tips
    fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        engine: "text-davinci-002",
        prompt: `Based on a wealth score of ${wealthScore}, suggest more tips for saving and earning money.`,
        maxTokens: 150,
        n: 1,
        temperature: 0.7,
      })
    })
      .then(response => response.json())
      .then(data => {
        const detailedTips = response.data.choices[0].text;
        tipsDiv.innerHTML = `<h2>Tips for saving and earning money:</h2><p>${tips}</p><p>${detailedTips}</p>`;
        console.log(`For user ${doc.id}:\n\n${tips}\n\nAdditional tips:\n\n${detailedTips}\n\n`);
        console.log(data.choices[0].text);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}).catch((error) => {
  console.error(error);
});



