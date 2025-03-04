# Secure Bank Cloud-Native Serverless Online Banking System

Overview
Secure Bank is a web-based banking application that allows users to create accounts, log in, perform deposits, withdraw funds, and check balances. It is powered by AWS Lambda for backend operations and Amazon RDS (MySQL) for data storage.

Features	
•	Login Page: Users enter their email and password to access their account.
•	AWS Lambda Authentication: Verifies user credentials securely.
•	Account Creation: Users can register with a name, email, PIN, and initial deposit.
•	Banking Transactions: Users can deposit money, withdraw funds, and check their balance.
•	Forgot Password: Users can reset their password using email verification and a PIN.
•	Secure Storage: User data and transactions are stored securely in an Amazon RDS database.

Technologies Used
•	Frontend: HTML, CSS, JavaScript
•	Backend: AWS Lambda (Python)
•	Database: Amazon RDS (MySQL)
•	Authentication & Transactions: Python scripts with SQL queries
•	Hosting : AWS S3

File Structure
•	create.html: Account creation page.
•	createcss.css: Styles for account creation page.
•	createjs.js: JavaScript for account creation functionality.
•	login.html: User login page.
•	logincss.css: Styles for login page.
•	loginjs.js: JavaScript for login authentication.
•	dashboard.html: Main user dashboard for transactions.
•	dashboardcss.css: Styles for the dashboard.
•	dashboardjs.js: JavaScript for handling transactions.
•	forgot.html: Password reset page.
•	forgotcss.css: Styles for password reset.
•	forgotjs.js: JavaScript for password reset functionality.
•	lambda_function.py: AWS Lambda function handling authentication, transactions, and password management.

Usage
1.	Navigate to the login page and enter credentials.
2.	Upon successful authentication, access the dashboard.
3.	Perform transactions like deposit, withdraw, or balance check.
4.	If needed, reset the password using the forgot password feature.

Setup Instructions
1.	Deploy AWS Lambda Functions:
  Upload lambda_function.py to AWS Lambda.
  Set up IAM permissions for database access.
2.	Configure Amazon RDS:
  Create a MySQL database.
  Update connection details in lambda_function.py.
3.	Run the Web Application:
  Host the HTML, CSS, and JavaScript files on a web server.
  Ensure the backend API endpoint is correctly configured.

Author
Ramteja Pendikatla

