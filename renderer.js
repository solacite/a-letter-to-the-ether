const Chart = require('chart.js');

const ctx = document.getElementById('productivityGraph').getContext('2d');
const productivityChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['9am', '10am', '11am', '12pm'],
        datasets: [{
            label: 'Productive %',
            data: [80, 60, 90, 75],
            fill: false,
            borderColor: 'green',
            tension: 0.1
        },
        {
            label: 'Unproductive %',
            data: [20, 40, 10, 25],
            fill: false,
            borderColor: 'red',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});