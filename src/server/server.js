'use strict';

const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Package = require('../../package');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const Routes = require('./routes/routes');

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
        version: Package.version,
        description: Package.description,
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

    // default route
    server.route(Routes.defaultRoute);

    // getTodo route
    server.route(Routes.getTodoRoute);

    // signup route
    server.route(Routes.signupRoute);

    // login route
    server.route(Routes.loginRoute);

    // createTodo route
    server.route(Routes.createTodoRoute);

    // updateTodo route
    server.route(Routes.updateTodoRoute);

    // deleteTodo route
    server.route(Routes.deleteTodoRoute);

    await server.start();
    console.log('Server ⚡ running at:', server.info.uri);
};

init();
