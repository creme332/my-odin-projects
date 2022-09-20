function checkPassword(){
    const firstpass = document.getElementById("password").value;
    const secondpass = document.getElementById("confirmpwd").value;
    console.log(firstpass,secondpass)
}

document.addEventListener("input",checkPassword)