
(function () {

    // dom selectors
    const form = document.querySelector('form');

    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email+span');

    const selectCountry = document.querySelector('#country');
    const selectCountryError = document.querySelector('#country+span');

    const zipCode = document.querySelector('#zip');
    const zipCodeError = document.querySelector('#zip+span');

    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#password+span');

    const confirmPassword = document.querySelector('#confirm');
    const confirmPasswordError = document.querySelector('#confirm+span');

    // email input listener
    email.addEventListener('input', () => {

        if (email.validity.valid) {
            emailError.textContent = "";
        }
        else {
            showError(email, emailError, 'email address');
        }
    });

    //select country
    selectCountry.addEventListener('change', () => {
        // if no country selected
        if (selectCountry.value === '') {
            selectCountryError.textContent = "please select a country";
        } else {
            selectCountryError.textContent = "";
        }
    })

    //zip code input listener
    zipCode.addEventListener('input', () => {
        // if zip code is valid
        if (zipCode.validity.valid) {
            zipCodeError.textContent = "";
        }
        else {
            showError(zipCode, zipCodeError, 'zip code');
        }
    });

    // password input listener
    password.addEventListener('input', () => {
        if (password.validity.valid) {
            passwordError.textContent = "";
            passwordError.className = 'error check';
        }
        // if password is changed after confirm password has been entered
        else if (confirmPassword.validity.valid && password.value !== confirmPassword.value) {
            passwordError.textContent = 'passwords do not match';
            passwordError.className = 'error';
            confirmPasswordError.className = 'error';
        }
        else {
            showError(password, passwordError, 'password');
        }
    });

    // confirm password input listener
    confirmPassword.addEventListener('input', () => {
        // compare values of passwords
        if (confirmPassword.value === password.value) {
            confirmPasswordError.textContent = "";
            confirmPasswordError.className = 'error check';
        }
        else {
            confirmPasswordError.textContent = "passwords do not match";
            confirmPasswordError.className = 'error';
        }
    })

    // error checking on submit
    form.addEventListener("submit", (event) => {
        // if the email field is valid let the form submit
        if (!email.validity.valid) {
            // If it isn't, display an appropriate error message
            showError(email, emailError, 'email address');
            // Then we prevent the form from being sent by canceling the event
            event.preventDefault();
        }
        // if no country selected
        else if (selectCountry.value === '') {
            selectCountryError.textContent = "please select a country";
            event.preventDefault();
        }
        // if zip code is invalid
        else if (!zipCode.validity.valid) {
            showError(zipCode, zipCodeError, 'zip code');
            event.preventDefault();
        }
        // if password is invalid
        else if (!password.validity.valid) {
            showError(password, passwordError, 'password');
            event.preventDefault();
        }
        // if passwords do not match
        else if (confirmPassword.value !== password.value) {
            // error text
            confirmPasswordError.textContent = 'passwords do not match';
            passwordError.textContent = 'passwords do not match';
            // styling
            confirmPasswordError.className = 'error';
            passwordError.className = 'error';
            event.preventDefault();
        }

    });

    // function to display error
    function showError(element, span, message) {
        // value missing
        if (element.validity.valueMissing) {
            span.textContent = `please enter a ${message}`;
        }
        // field doesn't contain correct type
        else if (element.validity.typeMismatch) {
            span.textContent = `please enter a valid ${message}`;
        }
        // field doesn't match pattern
        else if (element.validity.patternMismatch) {
            span.textContent = `please enter a valid ${message}`;
        }
        // data too short
        else if (element.validity.tooShort) {
            span.textContent = `${message} too short`;
        }

    };

})();