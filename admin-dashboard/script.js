const sidebar = document.querySelector(".sidebar");
const grid = document.querySelector(".container");
const toggleSidebarBtn = document.querySelector("#toggle-sidebar-button");

toggleSidebarBtn.addEventListener("click", ()=>{
    const TEMPLATE_WITH_SIDEBAR = '"s h" "s m" "s f"';
    const TEMPLATE_WITHOUT_SIDEBAR = '"h h" "m m" "f f"';
    if(grid.style.gridTemplateAreas != TEMPLATE_WITHOUT_SIDEBAR){
        grid.style.gridTemplateAreas = TEMPLATE_WITHOUT_SIDEBAR;
        sidebar.style.display = "none";
    }else{
        grid.style.gridTemplateAreas = TEMPLATE_WITH_SIDEBAR;
        sidebar.style.display = "flex";
    }
})

const line_chart_labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const line_chart_data = {
    labels: line_chart_labels,
    datasets: [{
      label: 'Visitors',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const line_chart_config = {
    type: 'line',
    data: line_chart_data,
    options: {responsive:true}
  };

  const lineChart = new Chart(
    document.getElementById('lineChart'),
    line_chart_config
  );

  const donut_chart_data = {
    labels: [
      'Python',
      'JavaScript',
      'C++'
    ],
    datasets: [{
      label: 'Languages',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const donut_chart_config = {
    type: 'doughnut',
    data: donut_chart_data,
    options: {responsive:true}
  };
  const donutChart = new Chart(
    document.getElementById('donutChart'),
    donut_chart_config
  );

  const polar_data = {
    labels: [
      'MIT',
      'GNU AGPLv3',
      'Unlicense',
      'Apache',
      'Mozila Public'
    ],
    datasets: [{
      label: 'Licenses',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };
  const polar_config = {
    type: 'polarArea',
    data: polar_data,
    options: {}
  };
  const polarChart = new Chart(
    document.getElementById('polarChart'),
    polar_config
  );

const labels = ['John','Adam','Barry','Axel','Rolan','Tor','Jam'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Number of commits',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};
const barChart = new Chart(
  document.getElementById('barChart'),
  config
);