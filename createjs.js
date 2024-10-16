document.getElementById('createAccountForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting traditionally

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pin = document.getElementById('pin').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const errorDiv = document.getElementById('error');

    //error messages
    errorDiv.innerText = '';

    // Validation checks
    // Check if passwords match
    if (password !== confirmPassword) {
        errorDiv.innerText = 'Passwords do not match.';
        return;
    }
    // Check if the initial deposit is valid and meets the minimum threshold
    if (initialDeposit < 1000) {
        errorDiv.innerText = 'Initial deposit must be at least ₹1000.';
        return;
    }

    // Account data  to send to AWS Lambda
    const accountData = {
        name: name,
        email: email,
        pin: pin,
        password: password,
        initialDeposit: initialDeposit
    };

    // Send account data to AWS Lambda using fetch
    fetch('https://ot6xwpnm99.execute-api.ap-south-1.amazonaws.com/default/createlambda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    })
    .then(response => response.json())
    .then(data => {
        if ( data.message === 'Account successfully created') {
            // Account creation ssuccessful
            errorDiv.innerText='Account successfully created';
            alert('Account successfully created!');
            window.location.href = './login.html'; // Redirect to login page
        } else if (data.error === 'Email already exists') {
            // Email already exists in the database
            errorDiv.innerText = 'An account with this email already exists.';
            alert(' Please use a different email.');
        }  else {
            // Handle other potential errors
            errorDiv.innerText = 'An error occurred. Please try again later.';
            alert('Server Not Responding');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorDiv.innerText = 'An error occurred while connecting to the server. Please try again later.';
    });
});
