const firstPasswordBox = document.getElementById("password");
const secondPasswordBox = document.getElementById("confirmpwd");

function checkPassword(){
    if (firstPasswordBox.value != secondPasswordBox.value){
        console.log("Passwords do not match")
        secondPasswordBox.classList.add("wrong");
        secondPasswordBox.parentElement.querySelector(".error-message").style.visibility="visible";
        }else{
            secondPasswordBox.classList.remove("wrong");
            secondPasswordBox.parentElement.querySelector(".error-message").style.visibility="hidden";
        console.log("YAY!")
    }
    console.log(firstPasswordBox.value,secondPasswordBox.value)
}
const msg = document.querySelector(".error-message");

// Init a timeout variable to be used below
let timeout = null;

// Listen for keystroke events
secondPasswordBox.addEventListener('keyup', function (e) {
    https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(checkPassword, 1000);
});