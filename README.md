# First_CRUD

This project is a simple CRUD (Create, Read, Update, Delete) application based on Java SpringBoot, React, and MongoDB.

## Features

- Create, Read, Update, and Delete operations
- Backend powered by Java SpringBoot
- Frontend built with React
- Data persistence with MongoDB

## Installation

### Backend

1. **Clone the repository**
    ```sh
    git clone https://github.com/Ferdinand-work/First_CRUD.git
    cd First_CRUD/crud_demo_backend
    ```
2. **Install dependencies**
    ```sh
    ./mvnw clean install
    ```
3. **Run the backend server**
    ```sh
    ./mvnw spring-boot:run
    ```

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

## Usage

1. **Start the backend server** and ensure it is running on `http://localhost:8080`.
2. **Start the frontend application** and navigate to `http://localhost:3000` in your browser.
3. **Interact with the CRUD operations** through the web interface.

## Contributing

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-foo`)
3. **Commit your changes** (`git commit -am 'Add some foo'`)
4. **Push to the branch** (`git push origin feature-foo`)
5. **Create a new Pull Request**
