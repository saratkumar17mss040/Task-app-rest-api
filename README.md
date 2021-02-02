# Task-app-rest-api

A simple task-rest 😎 API where the users can create, update, delete task with basic JWT to authenticate and authorize requests.

## Tech stacks used in building this API

Hapi - Secured web framework.

Joi - Schema description and data validation.

Hapi-auth-jwt2 - Hapi.js authentication plugin / scheme using JWT.

Json-web-token - JSON token implementation.

Uuid - For the creation of RFC4122 UUID's.

Dynamodb-local - NoSQL database that supports key-value and document data structures.

Aws-sdk - AWS sdk for javascript in order to connect to dynamodb-local.

Hapi-swagger - A swagger documentation UI generator plugin for hapijs.

Vision - Template rendering plugin support for hapij.

Inert - Static file and directory handlers plugin for hapijs.

## Some of the other tools used in this project to follow best practices, maintain code quality and to have good development experience

Eslint - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

Prettier - Prettier is an opinionated code formatter. It enforces a consistent style.

Dotenv - Loads environment variables from .env file.

Nodemon - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

## Installation:

Before trying to run the project make sure you have installed node, dynamodb-local.

## To run the project:

1.Clone this repo  
`git clone https://github.com/saratkumar17mss040/Task-app-rest-api.git`

2.Npm install  
`npm install`

3.Npm start  
`npm start`

## Interaction and API testing

Once the server started running open the browser with the localhost path as
http://localhost:3000/documentation

You will see swagger in which it provides the UI to test and call the API endpoints.

Alternatively you can also use postman to test API calls.

## Features

-   Users will be able to signup / login.
-   Users can create todo.
-   Users can get todo.
-   Users can update todo.
-   Users can delete todo.

