window.onload = function() {
  const { Chart, ArcElement, Tooltip, Legend } = require('chart.js');
  Chart.register(ArcElement, Tooltip, Legend);

  console.log('renderer.js loaded!');
  const ctx = document.getElementById('graph').getContext('2d');
  const productivityChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Productive', 'Unproductive'],
          datasets: [{
              data: [75, 25],
              backgroundColor: ['green', 'red']
          }]
      }
  });
};