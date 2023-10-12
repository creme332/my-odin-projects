window.addEventListener("DOMContentLoaded", () => {
  const myForm = document.getElementById("myform");
  console.log("window loaded");
  console.log(myForm);
  if (myForm) {
    myForm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        myForm.submit();
        console.log("Enter key pressed!");
      }
    });
  }
});
