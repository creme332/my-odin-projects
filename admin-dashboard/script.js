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