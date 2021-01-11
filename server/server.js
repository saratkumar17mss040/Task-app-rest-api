'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, response) => {
            return 'Hello World!';
        },
    });

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
};

init();
