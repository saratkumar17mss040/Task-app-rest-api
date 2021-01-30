'use strict';
const Hapi = require('@hapi/hapi');
const HapiAuthJWT = require('hapi-auth-jwt2');
const Handler = require('./handlers/handler');
const Users = require('./database');
require('dotenv').config();

// console.log(process.env.AWS_REGION);
// console.log(`userId of first person in the db: ${Users[0].userId}`);
// console.log(
//     `userTask of first person in the db: ${JSON.stringify(Users[0].tasks)}`,
// );

const validate = async function (decoded, request, h) {
    return { isValid: true };
};

const init = async () => {
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register(HapiAuthJWT);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.ACCESS_TOKEN_SECRET,
        validate,
        verifyOptions: { ignoreExpiration: true },
    });

    server.auth.default('jwt');

    // default route
    server.route({
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: Handler.defaultRouteHandler,
    });

    // signup route
    server.route({
        method: 'POST',
        path: '/signup',
        config: { auth: false },
        handler: Handler.signupRouteHandler,
    });

    // login route
    server.route({
        method: 'POST',
        path: '/login',
        config: { auth: false },
        handler: Handler.loginRouteHandler,
    });

    // getTodo route
    server.route({
        method: 'GET',
        path: '/id/{userId}',
        config: { auth: 'jwt' },
        handler: Handler.getTodoRouteHandler,
    });

    // createTodo route
    server.route({
        method: 'POST',
        path: '/todo',
        config: { auth: 'jwt' },
        handler: Handler.createTodoRouteHandler,
    });

    // updateTodo route
    server.route({
        method: 'PUT',
        path: '/todo',
        config: { auth: 'jwt' },
        handler: Handler.updateTodoRouteHandler,
    });

    // deleteTodo route
    server.route({
        method: 'DELETE',
        path: '/todo',
        config: { auth: 'jwt' },
        handler: Handler.deleteTodoRouteHandler,
    });

    await server.start();
    return server;
};

init()
    .then((server) => {
        console.log('Server running at:', server.info.uri);
    })
    .catch((err) => {
        console.log(err);
    });
