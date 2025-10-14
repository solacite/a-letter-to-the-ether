window.onload = function() {
  // import Chart.js components for line chart
  const { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } = require('chart.js');
  // register components
  Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

  const ctx = document.getElementById('graph').getContext('2d');

  const labels = ['9am', '10am', '11am', '12pm'];
  const productivity = [70, 40, 90, 60];

  const productivityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Productivity %',
        data: productivity,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: true,
        tension: 0.3, // smooth line
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Productivity (%)' }
        },
        x: {
          title: { display: true, text: 'Time' }
        }
      }
    }
  });
};