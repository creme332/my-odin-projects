const firstNameField = document.getElementById("firstname");
const lastNameField = document.getElementById("lastname");
const EmailField = document.getElementById("email");
const DOBfield = document.getElementById("dob");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmpwd");

const FieldsCount = 6 //number of fields present in form

const checkDelay = 1000; //delay after user input for verification. IN ms.
// Init a timeout variable to be used below
let timeout = Array(FieldsCount).fill(null);
let validField = Array(FieldsCount).fill(false);

function controlFox() {
    //updates fox animation if needed

    let CompletedFieldsCount = validField.filter(Boolean).length;
    //number of fields out of 6 completed

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

function informUser(valid, errorMsgElement, labelElement) {
    if (valid) {
        errorMsgElement.style.visibility = "hidden";
        labelElement.classList.remove("incorrect");
        labelElement.classList.add("correct");
    } else {
        errorMsgElement.style.visibility = "visible";
        labelElement.classList.remove("correct");
        labelElement.classList.add("incorrect");
    }
    controlFox();
}

// validateFirstName
function validateFirstName() {

    const errorMsgElement = firstNameField.parentElement.querySelector(".error-message");
    const labelElement = firstNameField.parentElement.querySelector("label");
    const inputElement = firstNameField.parentElement.querySelector("input");

    if (inputElement.checkValidity()) { //valid
        validField[0] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[0] = false;
        informUser(false, errorMsgElement, labelElement);
    }
}
firstNameField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[0]);
    timeout[0] = setTimeout(validateFirstName, checkDelay);
});

// validate last name
function validateLastName() {

    const errorMsgElement = lastNameField.parentElement.querySelector(".error-message");
    const labelElement = lastNameField.parentElement.querySelector("label");
    const inputElement = lastNameField.parentElement.querySelector("input");

    if (inputElement.checkValidity()) { //valid
        validField[1] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[1] = false;
        informUser(false, errorMsgElement, labelElement);
    }
}
lastNameField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[1]);
    timeout[1] = setTimeout(validateLastName, checkDelay);
});

// validate Email
function validateEmail() {
    const errorMsgElement = EmailField.parentElement.querySelector(".error-message");
    const labelElement = EmailField.parentElement.querySelector("label");
    const inputElement = EmailField.parentElement.querySelector("input");

    if (inputElement.checkValidity()) { //valid
        validField[2] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[2] = false;
        informUser(false, errorMsgElement, labelElement);
    }
}
EmailField.addEventListener('keyup', function (e) {
    clearTimeout(timeout[2]);
    timeout[2] = setTimeout(validateEmail, checkDelay);
});

// validate DOB
function validateDOB() {
    const errorMsgElement = DOBfield.parentElement.querySelector(".error-message");
    const labelElement = DOBfield.parentElement.querySelector("label");
    const inputElement = DOBfield.parentElement.querySelector("input");

    if (inputElement.checkValidity()) { //valid
        validField[3] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[3] = false;
        informUser(false, errorMsgElement, labelElement);
    }
}
DOBfield.addEventListener('change', function (e) {
    clearTimeout(timeout[3]);
    timeout[3] = setTimeout(validateDOB, checkDelay);
});

// Validate passwordField
function validatePassword() {
    //passwordField must contain atleast 1 uppercase, lowercase and digit
    const errorMsgElement = passwordField.parentElement.querySelector(".error-message");
    const labelElement = passwordField.parentElement.querySelector("label");
    const inputElement = passwordField.parentElement.querySelector("input");

    if (inputElement.checkValidity()) { //valid match
        validField[4] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[4] = false;
        informUser(false, errorMsgElement, labelElement);
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

    if (passwordField.value == confirmPasswordField.value) { //match 
        validField[5] = true;
        informUser(true, errorMsgElement, labelElement);
    } else {
        validField[5] = false;
        informUser(false, errorMsgElement, labelElement);
    }
}
confirmPasswordField.addEventListener('keyup', function (e) {
    https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
    clearTimeout(timeout[5]);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout[5] = setTimeout(validateConfirmPassword, checkDelay);
});