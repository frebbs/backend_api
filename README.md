# Node.js App with PostgreSQL, Redis, JWT, and Passport.js

This project sets up a development environment for a Node.js application using Docker Compose. The `docker-compose-local.yml` file defines services for PostgreSQL and Redis databases. The application includes a basic JSON request-response server with JWT authentication using Passport.js.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Start the Database Containers](#step-2-start-the-database-containers)
  - [Step 3: Install Node.js Dependencies](#step-3-install-nodejs-dependencies)
  - [Step 4: Run the Node.js Server](#step-4-run-the-nodejs-server)
  - [Step 5: Verify the Containers and Server Are Running](#step-5-verify-the-containers-and-server-are-running)
- [Configuration](#configuration)
  - [Docker Compose](#docker-compose)
  - [Node.js Server](#nodejs-server)
  - [Redis Connection in Node.js](#redis-connection-in-nodejs)
  - [JWT and Passport.js](#jwt-and-passportjs)
- [Volumes](#volumes)
- [Additional Configuration Files](#additional-configuration-files)
  - [.dockerignore](#dockerignore)
  - [.gitignore](#gitignore)
  - [.nvmrc](#nvmrc)
- [package.json Explained](#packagejson-explained)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [DevDependencies](#devdependencies)
- [Utility Functions for Database Operations (`utils/db_utils.js`)](#utility-functions-for-database-operations-utilsdb_utilsjs)
- [Database Configuration (`config/db.js`)](#database-configuration-configdbjs)
- [Passport Configuration (`config/passport-config.js`)](#passport-configuration-configpassport-configjs)

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Setup

### Step 1: Clone the Repository

If you haven't already, clone this repository to your local machine.

### Step 2: Start the Database Containers

Navigate to the project directory where the `docker-compose-local.yml` file is located and run:

```bash
docker-compose -f docker-compose-local.yml up -d
```

This will start the PostgreSQL and Redis containers in detached mode.

### Step 3: Install Node.js Dependencies

In the project directory, install the required Node.js packages:

```bash
npm install
```

### Step 4: Run the Node.js Server

#### Development Mode

To run the server in development mode, use the following command:

```bash
npm run start:dev
```

This will start the server using `nodemon`, which will automatically restart the server whenever you make changes to the code.

#### Production Mode

To run the server in production mode, use the following command:

```bash
npm run start:prod
```

You should see the message `Server running on http://localhost:8080/` in your terminal.

### Step 5: Verify the Containers and Server Are Running

To verify that the containers are running, execute:

```bash
docker-compose -f docker-compose-local.yml ps
```

You should see the PostgreSQL and Redis containers listed.

To test the server, navigate to `http://localhost:8080/` in your web browser. You should receive a JSON response with the message `Hello, world!`.

## Configuration

### Docker Compose

The `docker-compose-local.yml` file contains configurations for the following services:

#### PostgreSQL

- **Image**: `postgres:13`
- **Environment Variables**:
  - `POSTGRES_USER`: `postgres`
  - `POSTGRES_PASSWORD`: `postgres`
  - `POSTGRES_DB`: `app`
- **Ports**: `5432:5432`
- **Volumes**: `postgres_data:/var/lib/postgresql/data`

#### Redis

- **Image**: `redis:6`
- **Ports**: `6379:6379`
- **Volumes**: `redis_data:/data`

## Additional Configuration Files

### `.dockerignore`

The `.dockerignore` file specifies which files and directories should be excluded from the Docker build context. This helps in optimizing the build process and reducing the image size.

### `.gitignore`

The `.gitignore` file lists the files and directories that are not tracked by Git. This is useful for excluding environment-specific files or files containing sensitive information from the repository.

### `.nvmrc`

The `.nvmrc` file specifies the Node.js version that should be used for this project. Running `nvm use` in the project directory will automatically switch to the Node.js version specified, ensuring a consistent development environment.

## `package.json` Explained

The `package.json` file is the project's manifest and contains various configurations, including scripts to run, project dependencies, and other settings.

### Scripts

- `start:prod`: Executes `node app.js` to start the application in production mode.
- `start:dev`: Utilizes `nodemon` to start the application in development mode, automatically restarting the server upon code changes.
- `start:devDocker`: Initiates the development environment using Docker Compose as specified in the `docker-compose-local.yml` file.

### Dependencies

- `bcrypt`: Utilized for password hashing.
- `express`: The web framework used for building the application.
- `jsonwebtoken`: Employed for handling JSON Web Tokens.
- `passport`: Middleware for handling authentication in Node.js.
- `passport-jwt`: Strategy for Passport to handle JWT-based authentication.
- `pg`: PostgreSQL client for Node.js.
- `redis`: Client library for connecting to a Redis database.

### DevDependencies

- `nodemon`: A utility that monitors code changes and automatically restarts the server.

### Node.js Server

The server is set up using Express and listens on port 8080. It includes basic routes for user registration and login, and a protected route that requires JWT authentication. Passport.js is used for handling JWT-based authentication.

### Redis Connection in Node.js

The Node.js application connects to a Redis server running on `localhost:6379`. The connection is managed using the `node-redis` package.

### JWT and Passport.js

JWT is used for authentication, and Passport.js is used to handle JWT-based authentication strategies. The secret key for JWT is set as 'Chang3m3.' and tokens have an expiration time of 1 hour.

## Volumes

The following named volumes are defined to persist data:

- `postgres_data`: For PostgreSQL data
- `redis_data`: For Redis data

## Utility Functions for Database Operations (`utils/db_utils.js`)

The `utils/db_utils.js` file contains a set of utility functions for interacting with the PostgreSQL database. These functions are designed to perform CRUD (Create, Read, Update, Delete) operations on the `users` table. The utility functions are organized into an object called `dbUtils`, which is then exported for use in other parts of the application.

### Functions

#### `createUser({ username, email, password })`

- **Description**: This function takes an object containing a username, email, and password. It inserts a new user into the `users` table.
- **Returns**: Newly created user's ID, username, and email.

#### `getUserById(id)`

- **Description**: This function takes a user ID as an argument and fetches the corresponding user details from the `users` table.
- **Returns**: User details.

#### `updateUser({ id, username, email, password })`

- **Description**: This function takes an object containing a user ID, username, email, and password. It updates the corresponding user in the `users` table.
- **Returns**: Updated user's ID, username, and email.

#### `deleteUser(id)`

- **Description**: This function takes a user ID as an argument and deletes the corresponding user from the `users` table.
- **Returns**: ID of the deleted user.

#### `getUserByEmail(email)`

- **Description**: This function takes an email address as an argument and fetches the corresponding user details from the `users` table.
- **Returns**: User details.

#### `getUserByUsername(username)`

- **Description**: This function takes a username as an argument and fetches the corresponding user details from the `users` table.
- **Returns**: User details.

#### `getUserByEmailAndUsername({ email, username })`

- **Description**: This function takes an object containing an email and a username. It fetches the user details that match both the email and username from the `users` table.
- **Returns**: User details.

All these functions are asynchronous and make use of the `pool` object from `config/db.js` to interact with the PostgreSQL database.

## Database Configuration (`config/db.js`)

The `config/db.js` file is responsible for setting up and initializing the PostgreSQL database connection. It uses the `pg` package to create a connection pool and provides utility functions for database initialization.

### Connection Pool

The `Pool` object from the `pg` package is used to create a connection pool with the PostgreSQL database. The configuration for the pool includes:

- **User**: `postgres`
- **Host**: `localhost`
- **Database**: `app`
- **Password**: `postgres`
- **Port**: `5432`

### Functions

#### `initializeDb()`

- **Description**: This asynchronous function initializes the database. It checks if the database named `app` exists. If it doesn't, it creates the database and then connects to it. It also creates a `users` table if it doesn't already exist.
- **Parameters**: None
- **Returns**: None

### Initialization

The `initializeDb()` function is called immediately upon importing the `db.js` file to ensure that the database and table are set up before the application starts.

### Error Handling

If any error occurs during the initialization, it is caught and logged to the console with the message "Error initializing database".

### Export

The `pool` object is exported for use in other parts of the application for executing SQL queries.

## Passport Configuration (`config/passport-config.js`)

The `config/passport-config.js` file is responsible for setting up Passport.js with JWT (JSON Web Tokens) for authentication. It uses the `passport-jwt` package to implement JWT-based authentication strategy.

### Import Dependencies

- **Passport**: The core Passport library.
- **JwtStrategy, ExtractJwt**: Imported from `passport-jwt` for handling JWTs.
- **dbUtils**: Custom utility functions for database operations, imported from `utils/db_utils.js`.

### Options (`opts`)

- **jwtFromRequest**: Function to extract the JWT token from the request. It uses `ExtractJwt.fromAuthHeaderAsBearerToken()` to extract the JWT from the Authorization header.
- **secretOrKey**: The secret key used for signing and verifying the JWT. In this example, it's set to `'Chang3m3.'`.

### Passport Strategy

The `JwtStrategy` is configured with the `opts` and a callback function. The callback function is asynchronous and does the following:

1. Extracts the user ID from the JWT payload.
2. Uses the `getUserById` function from `dbUtils` to find the user in the database.
3. If the user is found, it calls `done(null, user)` to indicate successful authentication.
4. If the user is not found, it calls `done(null, false)` to indicate authentication failure.
5. If an error occurs, it calls `done(err, false)`.

### Error Handling

Errors are handled within the callback function and passed to Passport through the `done` function.

### Initialization

This configuration is used automatically by Passport due to the `passport.use()` function call.

