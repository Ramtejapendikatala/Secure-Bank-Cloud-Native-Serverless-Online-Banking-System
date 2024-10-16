       // Fetch email and password from localStorage
       const email = localStorage.getItem('userEmail');
       const password = localStorage.getItem('userPassword');

       if (!email || !password) {
           alert('No email or password found. Please log in.');
           window.location.href = 'login.html';
       }

       // AWS Lambda URL and API key
       const lambdaUrl = 'https://pns2dotn24.execute-api.ap-south-1.amazonaws.com/default/transactionlambda';
       const apiKey = 'your-api-key';

       function sendToLambda(actionType, data) {
           fetch(lambdaUrl, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'x-api-key': apiKey
               },
               body: JSON.stringify(data)
           })
           .then(response => response.json())
           .then(data => {
               alert(data.message);
           })
           .catch(error => {
               console.error('Error:', error);
           });
       }

       // Deposit
       document.getElementById('depositBtn').addEventListener('click', () => {
           const depositAmount = document.getElementById('depositAmount').value;
           if (depositAmount) {
               const data = {
                   email,
                   password,
                   depositamount: parseInt(depositAmount),
                   action: 'deposit'
               };
               sendToLambda('deposit', data);
           } else {
               alert('Please enter a deposit amount.');
           }
       });

       // Withdraw
       document.getElementById('withdrawBtn').addEventListener('click', () => {
           const withdrawAmount = document.getElementById('withdrawAmount').value;
           if (withdrawAmount) {
               const data = {
                   email,
                   password,
                   withdrawamount: parseInt(withdrawAmount),
                   action: 'withdraw'
               };
               sendToLambda('withdraw', data);
           } else {
               alert('Please enter a withdraw amount.');
           }
       });

       // Check Balance
       document.getElementById('checkBalanceBtn').addEventListener('click', () => {
           const check = document.getElementById('checkBalance').value;
           const data = {
               email,
               password,
               check: check === 'yes' ? 'yes' : 'no',
               action: 'checkBalance'
           };
           sendToLambda('checkBalance', data);
       });

       // Show Deposit Section
       document.getElementById('showDepositBtn').addEventListener('click', () => {
           hideAllSections();
           document.getElementById('depositSection').style.display = 'block';
       });

       // Show Withdraw Section
       document.getElementById('showWithdrawBtn').addEventListener('click', () => {
           hideAllSections();
           document.getElementById('withdrawSection').style.display = 'block';
       });

       // Show Check Balance Section
       document.getElementById('showCheckBalanceBtn').addEventListener('click', () => {
           hideAllSections();
           document.getElementById('checkBalanceSection').style.display = 'block';
       });

       // Hide all sections
       function hideAllSections() {
           document.getElementById('depositSection').style.display = 'none';
           document.getElementById('withdrawSection').style.display = 'none';
           document.getElementById('checkBalanceSection').style.display = 'none';
       }