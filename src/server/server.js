'use strict';

const Hapi = require('@hapi/hapi');
const DotEnv = require('dotenv').config();
const Joi = require('joi');

// index is id for now
const users = [
    {
        emailId: 'sam123@gmail.com',
        password: '123',
        tasks: ['Buy eggs', 'Buy milk'],
    },
    {
        emailId: 'ram123@gmail.com',
        password: '456',
        tasks: ['Buy rice', 'Buy fruits'],
    },
];

const init = async () => {
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // default route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            return {
                message: 'Basic task-rest api using hapijs',
            };
        },
    });

    // signup route
    server.route({
        method: 'POST',
        path: '/signup',
        handler: (request, response) => {
            const { emailId, password } = request.payload || {};

            const schema = Joi.object({
                emailId: Joi.string().email().required(),
                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .required(),
            });

            const { value, error } = schema.validate(request.payload);

            console.log(value, error);

            if (error) {
                return error.details;
            } else {
                users.push({ emailId, password });
                return { message: 'Successful signup !' };
            }
        },
    });

    // login route
    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, response) => {
            const { emailId, password } = request.payload || {};

            const schema = Joi.object({
                emailId: Joi.string().email().required(),
                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .required(),
            });

            const { value, error } = schema.validate(request.payload);

            console.log(value, error);

            if (error) {
                return error.details;
            } else if (
                users[0].emailId === emailId &&
                users[0].password === password
            ) {
                return { message: 'Successful login !' };
            } else {
                return { message: 'Incorrect username or password !' };
            }
        },
    });

    // getTodo route
    server.route({
        method: 'GET',
        path: '/id/{todoId}',
        handler: (request, response) => {
            const todoId = request.params.todoId || undefined;

            console.log(todoId);

            const schema = Joi.object({
                todoId: Joi.number().min(0),
            });

            const { value, error } = schema.validate({ todoId });

            console.log(value, error);

            if (error) {
                return error.details;
            } else {
                return { tasks: users[todoId].tasks };
            }
        },
    });

    // createTodo route
    server.route({
        method: 'POST',
        path: '/todo',
        handler: (request, response) => {
            const { userId, todo } = request.payload || {};

            const schema = Joi.object({
                userId: Joi.number().required().min(0),
                todo: Joi.string().required(),
            });

            const { value, error } = schema.validate(request.payload);

            console.log(value, error);

            if (error) {
                return error.details;
            } else {
                users[userId].tasks.push(todo);
                return { tasks: users[userId].tasks };
            }
        },
    });

    // updateTodo route
    server.route({
        method: 'PUT',
        path: '/todo',
        handler: (request, response) => {
            const { userId, updateTodoId, updateTodo } = request.payload || {};

            const schema = Joi.object({
                userId: Joi.number().required().min(0),
                updateTodoId: Joi.number().required().min(0),
                updateTodo: Joi.string(),
            });

            const { value, error } = schema.validate(request.payload);

            console.log(value, error);

            if (error) {
                return error.details;
            } else {
                users[userId].tasks[updateTodoId] = updateTodo;
                return { tasks: users[userId].tasks };
            }
        },
    });

    // deleteTodo route
    server.route({
        method: 'DELETE',
        path: '/todo',
        handler: (request, response) => {
            const { userId, deleteTodo } = request.payload || {};
            // const deleteRegex = new RegExp(deleteTodo, 'i');

            const schema = Joi.object({
                userId: Joi.number().required().min(0),
                deleteTodo: Joi.string(),
            });

            const { value, error } = schema.validate(request.payload);

            console.log(value, error);

            if (error) {
                return error.details;
            } else if (users[userId].tasks.includes(deleteTodo)) {
                users[userId].tasks = users[userId].tasks.filter(
                    (todo) => todo !== deleteTodo,
                );
                return { tasks: users[userId].tasks };
            } else {
                return {
                    message:
                        'Please enter an existing todoItem to be deleted !',
                };
            }
        },
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init();
