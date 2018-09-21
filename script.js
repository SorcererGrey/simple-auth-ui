var currentlyActive = 1;
var next = document.getElementById('next');
var submit = document.getElementById('submit');
var username = document.getElementById('usernamein');
var password = document.getElementById('passwordin');
var email = document.getElementById('emailin');
var form = document.getElementById('form');
var message = document.getElementById('message');
var buttons = document.getElementById('buttons');
var httpRequest = new XMLHttpRequest();
var usernameResponseValue = null;

username.style.zIndex = "3";
password.style.zIndex = "2";
email.style.zIndex = "1";

next.addEventListener('click', function() {

    switch (currentlyActive) {
        case 1:
        username.style.visibility = "hidden";
        checkUsername(username.value);
        currentlyActive = 2;
            break;
        case 2:
        password.style.visibility = "hidden";
        // Hide next
        buttons.removeChild(next);
        // Show submit
        submit.style.visibility = "visible";
            break;
    }

});
submit.addEventListener('click', function() {
    form.submit();
});
function checkUsername(username) {

    httpRequest.onreadystatechange = function() {
        // Check state
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(httpRequest.responseText);
            if (response['code'] == 200) {
                buttons.removeChild(next);
                // Show submit
                submit.style.visibility = "visible";
                email.style.visibility = "hidden";
                message.innerHTML = "Username has been found, all we need is your password.";
            }
        }
    
    }
    // Create request
    httpRequest.open('GET', 'http://localhost:8080/response.php');
    // Send request
    httpRequest.send();

}