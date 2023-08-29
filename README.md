# Express TypeScript App

This repository contains a  Express.js application written in TypeScript. This application is build as a part of internship screening task for a position of Backend Developer at Everestwalk Group

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
   npm run build   # Build TypeScript files
   npm start       # Start the Express server

The server should now be running at http://localhost:3000. You can access the API using a tool like Postman.

5. **Development Mode**
   npm run dev

This command will use `ts-node-dev` to start the server, which automatically restarts on code changes.

6. **Testing**
   To run tests
   npm test

7. **Linting and Formatting**
    To lint typescript files:
    npm run lint

    To format code:
    npm run format

8. **Directory Structure**
   src/: Source code directory containing TypeScript files.
   dist/: Compiled JavaScript files (generated during build).
   test/: Test files (unit tests and integration tests).
   config/: Configuration files.

Contributing
Feel free to fork this repository and submit pull requests if you have any improvements to suggest.

License
This project is licensed under the MIT License.