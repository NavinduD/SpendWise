firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUserUid = user.uid;
        const dailyRef = firebase.firestore().collection("expenses").doc(currentUserUid);

        const chart = Highcharts.chart('chart', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Daily Expenses'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e of %b'
                },
                title: {
                    text: 'Day'
                }
            },
            yAxis: {
                title: {
                    text: 'Amount'
                }
            },
            series: [{
                name: 'Your Expenses',
                data: [] // Initialize with empty data
            }, {
                name: 'Calculated Expenses Value',
                data: [] // Initialize with empty data
            }]
        });

        dailyRef.onSnapshot((doc) => {
            const seriesData = [];

            if (doc.exists) {
                const data = doc.data();

                // Iterate through each day in the document
                Object.keys(data).forEach((key) => {
                    if (key.startsWith("day")) {
                        const day = key;
                        const amount = parseFloat(data[key]);

                        // Convert the day to a JavaScript date object
                        const dateParts = day.substring(3).split('-');
                        const timestamp = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]);

                        // Add the data to the seriesData array
                        seriesData.push([timestamp, amount]);
                    }
                });

                // Update the chart's series data
                chart.series[0].setData(seriesData);
            } else {
                console.log("No such document!");
            }
        });
    }
});
