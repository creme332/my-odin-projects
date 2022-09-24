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

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Visitors',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {responsive:true}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );