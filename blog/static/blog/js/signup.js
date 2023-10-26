function validatePassword() {
    var pw = document.getElementById('user_pw').value;
    var re_pw = document.getElementById('re_pw').value;

    if (pw !== re_pw) {
        alert('Password do not match !');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('signup_form');
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validatePassword()) {
            return false;
        }

        const formData = new FormData(registrationForm);

        fetch(registrationForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                alert("Congratulations on your registration !")
                window.location.href = '/index/';
            } else {
                if (data.error_detail === 'Username or email duplication error') {
                    alert('Username or Email already exists.')
                } else {
                    alert('The password must be at least 8 characters long and must include alphabetic characters.')
                }
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    });
});

signOutBtn.addEventListener('click', function(event) {
    event.preventDefault();

    fetch('/signout/')
    .then(function(response) {
        if (response.status === 200) {
            sessionStorage.clear();
            window.location.href = '/index/';
        } else {
            console.error('Logout failed or error occurred');
        }
    })
    .catch(function(error) {
        console.error('Logout failed or error occurred', error);
    });
});