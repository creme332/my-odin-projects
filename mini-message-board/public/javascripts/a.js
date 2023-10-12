// this code will run for every page
window.addEventListener("DOMContentLoaded", () => {
  const myForm = document.getElementById("myform");
  console.log("window loaded");
  console.log(myForm);
  if (myForm) {
    // add eventlistener to form found on main page only
    myForm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        myForm.submit();
        console.log("Enter key pressed!");
      }
    });
  }
});
