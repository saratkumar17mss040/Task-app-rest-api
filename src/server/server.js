'use strict';

const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Handler = require('./handlers/handler');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Package = require('../../package');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
require('dotenv').config();

const validate = async function (decoded, request, h) {
    return { isValid: true };
};

const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: 'localhost',
    routes: {
        cors: true,
    },
});

const swaggerOptions = {
    info: {
        title: 'Task rest-api test documentation 😎',
        name: Package.name,
        version: Package.version,
        description: Package.description,
        author: Package.author,
        homePage: Package.homepage,
    },
};

const init = async () => {
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.ACCESS_TOKEN_SECRET,
        validate,
        verifyOptions: { ignoreExpiration: true },
    });

    server.auth.default('jwt');

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    // getTodo route
    server.route({
        method: 'GET',
        path: '/id/{userId}',
        config: { auth: 'jwt' },
        handler: Handler.getTodoRouteHandler,
    });

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
    console.log('Server ⚡ running at:', server.info.uri);
};

init();
