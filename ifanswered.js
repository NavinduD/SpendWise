firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        firebase.firestore().collection("users").doc(user.uid).get().then(function (doc) {
            if (doc.exists && doc.data().wealth_score) {
                const wealthScore = doc.data().wealth_score;
                console.log("The user's wealth score is:", wealthScore);

                if (wealthScore < 15) {
                    const budgetSteps = [
                        "Determine your income: Start by determining your total monthly income after taxes. This can include your salary, rental income, freelance income, and any other sources of income.",
                        "List your expenses: Make a list of all your monthly expenses, including rent/mortgage, utilities, groceries, transportation, entertainment, and other miscellaneous expenses. Use your bank statements and credit card statements to help you with this step.",
                        "Categorize your expenses: Once you have listed all your expenses, categorize them into essential and non-essential expenses. Essential expenses are those that you cannot do without, such as rent/mortgage, utilities, and groceries. Non-essential expenses are those that you can cut back on if needed, such as entertainment and dining out.",
                        "Set spending limits: Once you have categorized your expenses, set spending limits for each category based on your income. Be realistic about your spending limits and make sure you allocate enough money for your essential expenses.",
                        "Track your spending: Track your spending throughout the month to make sure you are sticking to your budget. Use a budgeting app or spreadsheet to keep track of your expenses.",
                        "Make adjustments: If you find that you are overspending in a particular category, make adjustments to your budget for the following month. This might mean cutting back on non-essential expenses or finding ways to reduce your essential expenses.",
                        "Review and revise: Review your budget regularly and make revisions as necessary. Your income and expenses may change over time, so it's important to keep your budget up to date.",
                        "Stay disciplined: Stick to your budget by staying disciplined and avoiding impulse purchases. Focus on your financial goals and remember that sticking to your budget will help you achieve them."
                    ];
                    const steps = [
                        "Identify your skills and interests: Start by identifying your skills and interests. Think about what you enjoy doing and what you are good at. This can help you narrow down your options for a side hustle or freelance gig.",
                        "Research your options: Once you have identified your skills and interests, research your options for a side hustle or freelance gig. Look for opportunities in areas that you are passionate about and that have a demand for your skills.",
                        "Develop a business plan: Before you start your side hustle or freelance gig, develop a business plan. This should include your goals, target audience, pricing, marketing strategy, and budget.",
                        "Build your network: Build your network by reaching out to friends, family, and colleagues who may be interested in your services. Join online communities and social media groups in your field to connect with potential clients.",
                        "Set up your online presence: Create a website or social media accounts to showcase your skills and services. This can help potential clients find you and learn more about your work.",
                        "Start small: Start small and take on a few clients at a time. This can help you build your experience and reputation while managing your workload.",
                        "Deliver quality work: Deliver quality work to your clients and exceed their expectations. This can help you build a loyal client base and generate positive word-of-mouth referrals.",
                        "Manage your time effectively: Manage your time effectively by setting clear boundaries and prioritizing your work. Make sure to schedule time for your side hustle or freelance gig around your other commitments."
                    ];

                    document.getElementById('result').innerHTML = `Your wealth level is: <b style="color:red;">Low</b>`;
                    document.getElementById('suggestion').innerHTML = "Creating a budget is an important step towards managing your finances effectively. Here are some steps you can follow to create a budget and stick to it:";
                    document.getElementById('suggestion2').innerHTML = "Starting a side hustle or freelance gig can be a great way to earn extra income and gain valuable experience in a new field. Here are some suggestions to help you get started:";

                    for (let i = 0; i < budgetSteps.length; i++) {
                        const step = document.createElement("li");
                        step.innerText = budgetSteps[i];
                        saveTips.appendChild(step);
                    }

                    // Loop through the steps and create a list item for each one
                    for (let i = 0; i < steps.length; i++) {
                        const step = steps[i];
                        const listItem = document.createElement("li");
                        listItem.textContent = step;
                        earnTips.appendChild(listItem);
                    };
                } else if (wealthScore >= 15 && wealthScore < 30) {
                    document.getElementById('result').innerHTML = `Your wealth level is: <b style="color:orange;">Middle</b>`;
                    document.getElementById('suggestion').innerHTML = "Automating your savings and investing in low-cost index funds is a smart way to grow your wealth over time. Here are some steps you can take:";
                    document.getElementById('suggestion2').innerHTML = "Here are some opportunities to advance your career:";

                    const budgetSteps = [
                        "Open a savings account: The first step in automating your savings is to open a savings account with a bank or financial institution in Sri Lanka. This will allow you to transfer a portion of your income directly into your savings account on a regular basis.",
                        "Set up automatic transfers: Once you have a savings account, set up automatic transfers from your checking account to your savings account. This can be done through your bank's online banking platform or by visiting a branch in person.",
                        "Choose a low-cost index fund: To invest your savings, consider investing in a low-cost index fund that tracks the performance of the Sri Lankan stock market. This can be done through a brokerage account or through a mutual fund that invests in Sri Lankan stocks.",
                        "Invest regularly: Once you have chosen a low-cost index fund, invest a portion of your savings into the fund on a regular basis. This can be done through automatic transfers from your savings account to your brokerage account or mutual fund.",
                        "Monitor your investments: It's important to monitor the performance of your investments on a regular basis. Make sure to review your portfolio periodically and make adjustments as needed."
                    ];

                    const steps = [
                        "Pursue further education: Consider pursuing a postgraduate degree or professional certification in your field to enhance your knowledge and skills. This can make you more valuable to your employer and increase your chances of promotion or a raise.",
                        "Seek out opportunities for leadership and responsibility: Look for opportunities to take on more responsibility and demonstrate your leadership skills. This can include leading a project, mentoring junior staff, or taking on a managerial role.",
                        "Network and build connections: Attend industry events and conferences, join professional associations, and connect with colleagues and potential mentors in your field. This can help you stay up-to-date on industry trends and opportunities, and may also lead to potential job offers or career advancement.",
                        "Improve your communication and interpersonal skills: Good communication and interpersonal skills are essential for career success. Consider taking courses or workshops to improve your public speaking, negotiation, and teamwork skills.",
                        "Look for job opportunities outside your current company: If you feel you have hit a ceiling in your current role or company, consider exploring job opportunities outside your current company. This can open up new career paths and potentially lead to higher pay and better benefits.",
                        "Negotiate a raise or promotion: If you feel you are ready for a raise or promotion, prepare a strong case for why you deserve it and present it to your employer. Be prepared to demonstrate your value to the company and the positive impact you have had on the organization.",
                        "Consider starting a side hustle or freelance gig: Starting a side hustle or freelance gig in your field can help you develop new skills and experiences, build your network, and potentially lead to new career opportunities or higher pay."
                    ];

                    for (let i = 0; i < budgetSteps.length; i++) {
                        const step = document.createElement("li");
                        step.innerText = budgetSteps[i];
                        saveTips.appendChild(step);
                    }

                    // Loop through the steps and create a list item for each one
                    for (let i = 0; i < steps.length; i++) {
                        const step = steps[i];
                        const listItem = document.createElement("li");
                        listItem.textContent = step;
                        earnTips.appendChild(listItem);
                    }
                } else {
                    document.getElementById('result').innerHTML = `Your wealth level is: <b style="color:green;">High</b>`;;
                    document.getElementById('suggestion').innerHTML = "Consulting with a financial advisor and investing in a diversified portfolio can be a great way to grow your wealth and achieve your financial goals. Here are some steps to help you get started:";
                    document.getElementById('suggestion2').innerHTML = "Start a business or invest in real estate, here are some general steps you can take:";

                    const budgetSteps = [
                        "Find a reputable financial advisor: Look for a financial advisor who is qualified, experienced, and has a good reputation. You can find a financial advisor through referrals from friends or family, or by searching online.",
                        "Discuss your financial goals: Once you have found a financial advisor, schedule a meeting to discuss your financial goals and investment objectives. Be clear about your investment time horizon, risk tolerance, and other important factors that will help your advisor create a customized investment plan for you.",
                        "Create a diversified portfolio: Your financial advisor will work with you to create a diversified portfolio that aligns with your investment objectives and risk tolerance. A diversified portfolio can help spread your investment risk across multiple asset classes and minimize the impact of market volatility.",
                        "Invest regularly: Once you have created a diversified portfolio, it's important to invest regularly to achieve your long-term financial goals. Your financial advisor can help you set up a systematic investment plan that fits your budget and investment objectives.",
                        "Monitor your portfolio: It's important to monitor your portfolio on a regular basis to ensure that it remains aligned with your investment objectives and risk tolerance. Your financial advisor can help you review your portfolio periodically and make adjustments as needed."
                    ];

                    const steps = [
                        "Research the market: Before starting a business or investing in real estate, it's important to research the market in Sri Lanka. Look at the demand for the product or service you want to offer or the real estate market in the area you're interested in.",
                        "Develop a business plan: If starting a business, develop a business plan that outlines your goals, target audience, pricing, marketing strategy, and budget. This will help you stay organized and focused on your goals.",
                        "Register your business: If starting a business, register your business with the appropriate authorities in Sri Lanka. This may involve registering with the Registrar of Companies, obtaining a business license, and registering for taxes.",
                        "Secure financing: Whether starting a business or investing in real estate, you may need to secure financing. This can be done through a bank loan, a line of credit, or by finding investors.",
                        "Find a location: If starting a business, find a location that is convenient for your target audience and fits your budget. If investing in real estate, research different areas in Sri Lanka and find a property that fits your budget and investment goals.",
                        "Seek legal advice: If starting a business or investing in real estate, seek legal advice from a lawyer in Sri Lanka. This will ensure that you understand the legal requirements and risks involved.",
                        "Network: Build your network by attending industry events and connecting with other entrepreneurs or real estate investors in Sri Lanka. This can help you find potential customers or partners.",
                        "Hire professionals: Consider hiring professionals such as an accountant or a real estate agent to help you navigate the process and make informed decisions."
                    ];


                    for (let i = 0; i < budgetSteps.length; i++) {
                        const step = document.createElement("li");
                        step.innerText = budgetSteps[i];
                        saveTips.appendChild(step);
                    }

                    // Loop through the steps and create a list item for each one
                    for (let i = 0; i < steps.length; i++) {
                        const step = steps[i];
                        const listItem = document.createElement("li");
                        listItem.textContent = step;
                        earnTips.appendChild(listItem);
                    }

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

function loadQuestions() {
    form.style.display = 'block';
};



