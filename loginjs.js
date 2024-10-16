document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    //error messages
    errorDiv.innerText = '';

    // Sending data to lambda
    const loginData = {
        email: email,
        password: password
    };

    fetch('https://eivm8vx6c2.execute-api.ap-south-1.amazonaws.com/default/loginlambda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'your-api-key-here'          },
        body: JSON.stringify(loginData)
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            // Redirect to the dashboard on successful login
            alert('Login Successful');
            if (email && password) {
                // Store the email in localStorage
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
                // Redirect to the dashboard
                window.location.href = 'dashboard.html';
            }
        } else if (data.error === 'Wrong password') {
            // Display wrong password message
            errorDiv.innerText = 'Invalid Password';
            alert('Please Check Your Password & Try Again');
        } else if (data.error === 'Invalid email & password') {
            // Display invalid email or password message
            errorDiv.innerText = 'Invalid Email or Password';
            alert('Please check your credentials and Try Again.');
        } else {
            // Handle any unexpected response from the server
            errorDiv.innerText = 'An unexpected error occurred. Please try again.';
            alert('Server Not Responding');        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorDiv.innerText = 'An error occurred while connecting to the server. Please try again later.';
    });
});
