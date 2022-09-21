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

function displayErrorInfo(valid, errorMsgElement, labelElement) {
    if (valid) {
        errorMsgElement.style.visibility = "hidden";
        labelElement.classList.remove("incorrect");
        labelElement.classList.add("correct");
    } else {
        errorMsgElement.style.visibility = "visible";
        labelElement.classList.remove("correct");
        labelElement.classList.add("incorrect");
    }
}

// validate last name
function validateLastName() {

    const errorMsgElement = lastNameField.parentElement.querySelector(".error-message");
    const labelElement = lastNameField.parentElement.querySelector("label");
    const inputElement = lastNameField.parentElement.querySelector("input");

    const MIN_LENGTH = parseInt(inputElement.getAttribute("minlength"));
    console.log(lastNameField.value, MIN_LENGTH);

    if (lastNameField.value.length >= MIN_LENGTH) { //valid
        displayErrorInfo(true, errorMsgElement, labelElement);
    } else {
        displayErrorInfo(false, errorMsgElement, labelElement);
    }
}
lastNameField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[1]);
    timeout[1] = setTimeout(validateLastName, checkDelay);
});

// validateFirstName
function validateFirstName() {

    const errorMsgElement = firstNameField.parentElement.querySelector(".error-message");
    const labelElement = firstNameField.parentElement.querySelector("label");
    const inputElement = firstNameField.parentElement.querySelector("input");

    const MIN_LENGTH = parseInt(inputElement.getAttribute("minlength"));
    console.log(firstNameField.value, MIN_LENGTH);

    if (firstNameField.value.length >= MIN_LENGTH) { //valid
        displayErrorInfo(true, errorMsgElement, labelElement);
    } else {
        displayErrorInfo(false, errorMsgElement, labelElement);
    }
}
firstNameField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[0]);
    timeout[0] = setTimeout(validateFirstName, checkDelay);
});


// Validate passwordField
function validatePassword() {
    //passwordField must contain atleast 1 uppercase, lowercase and digit

    //https://www.html5pattern.com/Passwords
    const regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$");
    const errorMsgElement = passwordField.parentElement.querySelector(".error-message");
    const labelElement = passwordField.parentElement.querySelector("label");

    if (regex.test(passwordField.value)) { //valid match
        displayErrorInfo(true, errorMsgElement, labelElement);
    } else {
        displayErrorInfo(false, errorMsgElement, labelElement);
    }
}
passwordField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[4]);
    timeout[4] = setTimeout(validatePassword, checkDelay);
});

// Validate confirmPasswordField
function validateConfirmPassword() {
    const errorMsgElement = confirmPasswordField.parentElement.querySelector(".error-message");
    const labelElement = confirmPasswordField.parentElement.querySelector("label");

    if (passwordField.value == confirmPasswordField.value && confirmPasswordField.value != "") { //match 
        displayErrorInfo(true, errorMsgElement, labelElement);
    } else {
        displayErrorInfo(false, errorMsgElement, labelElement);
    }
}
confirmPasswordField.addEventListener('keyup', function (e) {
    https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
    clearTimeout(timeout[5]);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout[5] = setTimeout(validateConfirmPassword, checkDelay);
});