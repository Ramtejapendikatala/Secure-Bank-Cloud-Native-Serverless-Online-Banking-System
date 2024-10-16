document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('verifyButton').addEventListener('click', function () {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const pin = document.getElementById('pin').value.trim();
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (newPassword != confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.style.color = "red";
        }
        if (!passwordPattern.test(newPassword)) {
            // If password does not match the pattern, show an alert
            alert(
                'Password must contain:\n' +
                '1 Capital Letter [A-Z]\n' +
                '1 Small Letter [a-z]\n' +
                '1 Number [0-9]\n' +
                '1 Special Character [!, @, #, $, &, *, ^]\n' +
                'Minimum 8 characters in length.'
            );
            return; // Exit the function if the password format is invalid
        }
    
        // Check if any fields are empty
        if (!name || !email || !pin || !newPassword) {
            document.getElementById('warningMessage').style.display = 'block';
        } else {
            document.getElementById('warningMessage').style.display = 'none';
            if (confirm("Are you sure you want to submit the data?")) {
                verifyUser(name, email, pin,newPassword);
            }
        }
    });

    function verifyUser(name, email, pin,newPassword) {
        const lambdaEndpoint = 'https://lel2wzzes0.execute-api.ap-south-1.amazonaws.com/default/forgotlambda';        // Your Lambda endpoint

        // Construct the payload as JSON
        const payload = {
            name: name,
            email: email,
            pin: parseInt(pin),
            password : newPassword};

        fetch(lambdaEndpoint, {
            method: 'POST', // Use POST to send data in the body
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Send the JSON payload
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the message from the Lambda response
            if (data.status === "success") {
                alert("Success: " + data.message);
                window.location.href = './login.html'; // Redirect to login page on success
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error sending data: " + error.message);
        });
    }
});
