## Contactbook-API

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/contactbook-api.git
    cd contactbook-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Admin Routes

- **Signup Admin**
    - `POST /admin/signup`
    - Request Body: `{ "email": "admin@example.com", "Password": "password" }`

- **Login Admin**
    - `POST /admin/login`
    - Request Body: `{ "email": "admin@example.com", "Password": "password" }`

- **Read Admin**
    - `GET /admin/read`
    - Headers: `{ "Authorization": "Bearer <token>" }`

### User Routes

- **Signup User**
    - `POST /users/signup`
    - Request Body: `{ "firstname": "John", "lastname": "Doe", "email": "john@example.com", "Password": "password" }`
    - Supports file upload for profile images.

- **Login User**
    - `POST /users/login`
    - Request Body: `{ "email": "john@example.com", "Password": "password" }`

- **Delete User**
    - `DELETE /users/delete/:id`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Update User**
    - `PATCH /users/update/:id`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Request Body: `{ "firstname": "John", "lastname": "Doe", "email": "john@example.com", "Password": "newpassword" }`

- **Read Users**
    - `GET /users/read`
    - Headers: `{ "Authorization": "Bearer <token>" }`

### Contact Routes

- **Create Contact**
    - `POST /contact/creatcontact`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Request Body: `{ "name": "Jane Doe", "email": "jane@example.com", "phone": "1234567890", "address": "123 Main St", "userID": "user_id" }`

- **Read Contacts**
    - `GET /contact/read`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Update Contact**
    - `PATCH /contact/update/:id`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Request Body: `{ "name": "Jane Doe", "email": "jane@example.com", "phone": "1234567890", "address": "123 Main St" }`

- **Delete Contact**
    - `DELETE /contact/delete/:id`
    - Headers: `{ "Authorization": "Bearer <token>" }`

## API Endpoints
### Authentication
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### User Management
- **GET /api/users**: Retrieve user data (requires authentication).
- **PUT /api/users/:id**: Update user profile (requires authentication).

## Security Measures
- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are used for secure authentication and authorization.
- Error handling middleware provides consistent error responses.

## Data Population
- Use the `populateData.js` utility to populate the database with initial user data for testing purposes.
