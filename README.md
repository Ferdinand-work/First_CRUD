# First_CRUD

This project is a simple CRUD (Create, Read, Update, Delete) application based on Java SpringBoot, React, and MongoDB.

## Features

- Create, Read, Update, and Delete operations
- Backend powered by Java SpringBoot
- Frontend built with React
- Data persistence with MongoDB
- JWT authentication for secure access

## Installation

### Backend

1. **Clone the repository**

    ```sh
    git clone https://github.com/Ferdinand-work/First_CRUD.git
    cd First_CRUD/
    ```

2. **Install dependencies**

    ```sh
    ./mvnw clean install
    ```

3. **Run the backend server**

    ```sh
    ./mvnw spring-boot:run
    ```

4. **Configure JWT**
   - Update the `application.properties` file with your JWT secret and other settings as needed. 
   - Example properties:
     ```
     jwt.secret=your_jwt_secret
     jwt.expiration=3600000
     ```
   - Ensure your environment variables are set if using an external JWT provider.

### Frontend

1. **Navigate to the frontend directory**

    ```sh
    cd ../crud_demo_frontend
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Run the frontend application**

    ```sh
    npm start
    ```

4. **Configure JWT**
   - Update API endpoints in your React application to include the JWT token in requests.
   - Example:
     ```js
     fetch('http://localhost:8080/api/resource', {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${yourToken}`
       }
     });
     ```
   - Handle JWT storage in your React application, for example in local storage or cookies.

## Usage

1. **Start the backend server** and ensure it is running on [http://localhost:8080](http://localhost:8080).
2. **Start the frontend application** and navigate to [http://localhost:3000](http://localhost:3000) in your browser.
3. **Log in** with valid credentials to receive a JWT token.
4. **Interact with the CRUD operations** through the web interface. Ensure you include the JWT token in the request headers for secured endpoints.

## Contributing

1. **Fork the repository**
2. **Create a new branch** (e.g., `git checkout -b feature-foo`)
3. **Commit your changes** (e.g., `git commit -am 'Add some foo'`)
4. **Push to the branch** (e.g., `git push origin feature-foo`)
5. **Create a new Pull Request**

## JWT Integration

- **Login Endpoint**: Use `/api/auth/login` to obtain a JWT token. You will need to provide credentials in the request body.
- **Protected Endpoints**: Include the `Authorization` header with the value `Bearer <your_token>` in requests to access protected resources.
- **Token Storage**: Store the JWT securely in your frontend application, such as in local storage or cookies.

