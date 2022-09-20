const firstNameField = document.getElementById("firstname");
const lastNameField = document.getElementById("lastname");
const EmailField = document.getElementById("email");
const DOBfield = document.getElementById("dob");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmpwd");

const FieldsCount = 6 //number of fields present in form
let CompletedFieldsCount = 0; //number of fields out of 6 completed

const checkDelay = 1000; //delay after user input for verification. IN ms.
// Init a timeout variable to be used below
let timeout = Array(FieldsCount).fill(null);

function controlFox() {
    //updates fox animation if needed

    // 0 < CompletedFieldsCount <= 2 : fox stays idle
    // 2 < CompletedFieldsCount <= 4 : fox walks
    // 4 < CompletedFieldsCount <= 6 : fox runs

    const foxIdleAnimation = "Survey";
    const foxRunAnimation = "Run";
    const foxWalkAnimation = "Walk";
    const foxObj = document.getElementById("fox");

    //Initially fox is already idle
    if (CompletedFieldsCount <= parseInt(FieldsCount / 3)) {
        foxObj.setAttribute("animation-name", foxIdleAnimation);
        return;
    }
    if (CompletedFieldsCount <= parseInt(2 * FieldsCount / 3)) {
        foxObj.setAttribute("animation-name", foxWalkAnimation);
        return;
    }
    foxObj.setAttribute("animation-name", foxRunAnimation);
}

// Validate passwordField
function validatePassword() {
    //passwordField must contain atleast 1 uppercase, lowercase and digit

    //https://www.html5pattern.com/Passwords
    const regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$");
    const errorMsgElement = passwordField.parentElement.querySelector(".error-message");

    if (regex.test(passwordField.value) === false) {
        errorMsgElement.style.visibility = "visible";
    } else {
        errorMsgElement.style.visibility = "hidden";
    }
}
passwordField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[4]);
    timeout[4] = setTimeout(validatePassword, checkDelay);
});

// Validate confirmPasswordField
function validateConfirmPassword() {
    const errorMsgElement = confirmPasswordField.parentElement.querySelector(".error-message");

    if (passwordField.value != confirmPasswordField.value) {
        errorMsgElement.style.visibility = "visible";
    } else {
        errorMsgElement.style.visibility = "hidden";
    }
}
confirmPasswordField.addEventListener('keyup', function (e) {
    https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
    clearTimeout(timeout[5]);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout[5] = setTimeout(validateConfirmPassword, checkDelay);
});