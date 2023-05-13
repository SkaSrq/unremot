# User Authentication API

This is a Node.js RESTful API for user registration, authentication, and user details using Express.js and a MySQL database. It includes server-side validation, secure password hashing, and token-based authentication.

## Getting Started
1. Install Node.js and npm
2. Clone this repository
3. Create a .env file in the root directory with the following variables:
    ```PORT=8080
       CLIENT_URL=http://localhost:3000
       DB_NAME=test_db
       DB_USER=root
       DB_PASS=Root1234
       DB_HOST=unremot-db.jf490ktcolbl.ap-southeast-2.rds.amazonaws.com
       DB_PORT=3306
       DB_DIALECT=mysql
       JWT_SECRET=super-secret
       
4. Install dependencies with `npm install`
5. Start the server with `npm run main`

## Endpoints
### POST /api/v1/public/register
Registers a new user with the following fields in the request body:

* **firstName**: required string

* **lastName**: required string

* **username**: required unique string

* **email**: required unique string

* **password**: required string

### POST /api/v1/public/login
Logs in an existing user with the following fields in the request body:

* **username**: required string

* **password**: required string

Returns a JSON Web Token (JWT) that should be included in subsequent requests to authenticate the user.

### GET /api/v1/secured/user
Returns the user details for the authenticated user based on the JWT included in the request headers.

### Error Handling
If there is an error in processing a request, the API will return a JSON response with a **message** field describing the error. The HTTP status code will also be set appropriately (e.g., 400 for bad request, 401 for unauthorized).

### Security
This API includes several security features to protect against common web application vulnerabilities:

* Server-side validation using Joi to ensure that incoming data is properly validated before processing
* Secure password hashing and storage using bcrypt to ensure the security of user passwords
* Token-based authentication using JSON Web Tokens (JWT) to securely manage user sessions and authentication status
* Protection against cross-site scripting (XSS) and cross-site request forgery (CSRF) attacks using best practices for secure coding
