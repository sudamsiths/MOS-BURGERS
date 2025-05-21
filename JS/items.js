
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Chicken Burger (Regular)', 'Double-Cheese Burger', 'MOS Special Submarine', 'Steak Fries', 'Chicken Cheese Pasta', 'Special Horgie Submarine'],
    datasets: [{
      label: 'MOS Burgers',
      data: [18, 19, 15, 20, 19.5, 18],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
