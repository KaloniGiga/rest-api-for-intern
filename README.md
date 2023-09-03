# Express Typescript App

This repository contains a  Express.js application written in TypeScript. This application is build as a part of internship screening task for a position of Backend Developer at Everestwalk Group

## Overview:
  This Express API is designed to manage records of users and (additional feature) posts in a relational database. It adheres to the following requirements and best practices:

 1. **User and Post Models**: The application utilizes Sequelize with TypeScript to define user and post models. Sequelize simplifies database operations and TypeScript adds type safety.

 2. **Controllers and Services**: Controllers handle HTTP requests and responses, while services encapsulate business logic and database operations. This separation of concerns enhances code organization and maintainability.

 3. **Error Handling**: Robust error handling is implemented using custom error handlers. Specific error responses are provided with appropriate HTTP status codes for better client communication.

4. **Data Validation**: The API employs validation techniques to ensure data integrity. Validation is performed using libraries like express-validator to validate incoming data against predefined rules. 


5. **Testing**: Unit tests are created using the Jest testing framework to verify the correctness of API endpoints and error handling. These tests ensure that the application functions as expected.

6. **Code Organization**: Code follows best practices for organization, readability, and maintainability. Models, controllers, services, and error handlers are well-structured for easy development and maintenance.

## API Endpoints

**Create a New User**
Method: POST
Description: Create a new user.
Endpoint: /users

**Get All Users**
Method: GET
Description: Get all users' data.
Endpoint: /users

**Get User Data by ID**
Method: GET
Description: Get user data by ID.
Endpoint: /users/:id

**Update User Data by ID**
Method: PUT
Description: Update user data by ID.
Endpoint: /users/:id

**Delete User by ID**
Method: DELETE
Description: Delete user by ID.
Endpoint: /users/:id

**Create a post for user with userId**
Method: POST
Description: Create post for user with id --> userid
EndPoint: /posts/:userId

**Get all posts of user with userId**
Method: GET
EndPoint: /posts/user/:userId

**Get post by Id**
Method: GET
EndPoint: /posts/:id

## Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/express-typescript-app.git
   cd express-typescript-app

2. **Install Dependencies**
     ```bash
     npm install
    
3. **Configuration**
   Rename the `.env.example` file to `.env` and configure environment variables if necessary.

4. **Build and Run**
   ```bash
   npm run build   # Build TypeScript files
   npm start       # Start the Express server

   The server should now be running at http://localhost:3000. You can access the API using a tool like Postman.

5. **Development Mode**
   ```bash
   npm run dev

   This command will use `ts-node-dev` to start the server, which automatically restarts on code changes.

6. **Testing**
   ```bash
   To run tests
   npm test

7. **Linting and Formatting**
   ```bash
    To lint typescript files:
    npm run lint

    To format code:
    npm run format

8. **Directory Structure** 
   ```bash
   src/: Source code directory containing TypeScript  files.  

   dist/: Compiled JavaScript files (generated during build). 

   __test__/: Test files (unit tests and integration tests).  

   src/config: Configuration file for database.

   src/controllers: Controller files

   src/models: Model files 

   src/services: Services files to abstract away common tasks done in contrllers and maintain modularity of code.

   src/middlewares: contains middleware for errorhandling and data validation and sanitization.

   src/routes: contains route files

   src/types: for declaring interfaces and types.

   src/utils: utility files

   src/errors: custom error for varying types are declared.


## License
This project is licensed under the MIT License.