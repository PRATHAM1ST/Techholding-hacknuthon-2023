# Hacknuthon 4.0 - Quad.js

This project is a submission for Hacknuthon 4.0 by Team Quad.js. It consists of a Node.js application built using Express.js and GraphQL. The application provides various routes and functionalities for creating, updating, deleting, and fetching user data.

## Devfolio Link

https://devfolio.co/projects/synchrobridge-627a

## Prerequisites importanat
Before running the project, make sure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```
   cd <project_directory>
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Usage

To start the application, run the following command:

```
npm start
```

The application will start running on port 3000.

## Files

The project includes the following files:

- `index.js`: The main entry point of the application. It sets up the Express server and defines the routes and middleware.

- `GraphQL.js`: Defines the GraphQL schema and provides endpoints for executing GraphQL queries.

- `Router/Auth/auth.js`: Handles user authentication using username and password.

- `Router/Create/create.js`: Provides endpoints for creating users and clients.

- `Router/Delete/delete.js`: Provides an endpoint for deleting a user.

- `Router/Fetch/client.js`: Provides an endpoint for fetching client data.

- `Router/Fetch/fetch.js`: Provides endpoints for fetching random users, user by ID, and all users.

- `Router/Fetch/User.js`: Provides endpoints for fetching random users, user by ID, and all users.

- `Router/Update/update.js`: Provides endpoints for updating a user and client's mappedData.

- `Database/Connection.js`: Establishes the connection to the database.

- `Database/ClientSchema.js`: Defines the schema for the client data.

- `Database/DataSchema.js`: Defines the schema for the user data.

- `Middleware/jsontoxml.js`: Middleware for converting JSON responses to XML format.

- `Middleware/xmltojson.js`: Middleware for converting XML requests to JSON format.

- `Middleware/mapping.js`: Middleware for mapping user data.

- `Middleware/graphqltojson.js`: Middleware for converting GraphQL responses to JSON format.

## API Routes

The following routes are available in the application:

- `GET /`: Returns "Hello World!" as a test route.

- `GET /graphql`: Provides a GraphiQL interface for executing GraphQL queries.

- `POST /create/user`: Creates a new user.

- `POST /create/client`: Creates a new client.

- `DELETE /delete/user/:id`: Deletes a user with the specified ID.

- `GET /fetch/randomUser`: Returns a random user.

- `GET /fetch/randomUsers/:numUsers`: Returns the specified number of random users.

- `GET /fetch/user/:id`: Returns a user with the specified ID.

- `GET /fetch/users`: Returns all users.

- `GET /fetch/client/:clientId`: Returns client data for the specified client ID.

- `PUT /update/user/:id`: Updates a user with the specified ID.

- `PUT /update/client/:id`: Updates the mappedData for a client with the specified ID.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
