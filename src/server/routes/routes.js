'use strict';

const Handler = require('../handlers/handler');
const Schema = require('../validations/validation');

const defaultRoute = {
    method: 'GET',
    path: '/defaultPath',
    handler: Handler.defaultRouteHandler,
    config: {
        auth: false,
        description: 'Get - default todo route',
        notes: ['Returns the default todo route response'],
        tags: ['api'],
        cors: true,
    },
};

const getTodoRoute = {
    method: 'GET',
    path: '/id/{userId}',
    handler: Handler.getTodoRouteHandler,
    config: {
        // auth: 'jwt',
        auth: false,
        description: 'Get - todo by userId',
        notes: ["Returns all the todo's for the given userId"],
        tags: ['api'],
        cors: true,
        validate: {
            params: Schema.getTasksSchema,
        },
    },
};

const signupRoute = {
    method: 'POST',
    path: '/signup',
    handler: Handler.signupRouteHandler,
    config: {
        auth: false,
        description: 'Post - signup by emailId and password',
        notes: ['Returns whether the signup is successful or not with userId '],
        tags: ['api'],
        cors: true,
        validate: {
            payload: Schema.signupSchema,
        },
    },
};

const loginRoute = {
    method: 'POST',
    path: '/login',
    handler: Handler.loginRouteHandler,
    config: {
        auth: false,
        description: 'Post - login by emailId and password',
        notes: ['Returns whether the login is successful or not'],
        tags: ['api'],
        cors: true,
        validate: {
            payload: Schema.loginSchema,
        },
    },
};

const createTodoRoute = {
    method: 'POST',
    path: '/todo',
    handler: Handler.createTodoRouteHandler,
    config: {
        auth: 'jwt',
        // auth: false,
        description: 'Post - submit todo by userId, todo, todoStatus',
        notes: ["Returns all the todo's with the submitted todo"],
        tags: ['api'],
        cors: true,
        validate: {
            payload: Schema.createTaskSchema,
        },
    },
};

const updateTodoRoute = {
    method: 'PUT',
    path: '/todo',
    handler: Handler.updateTodoRouteHandler,
    config: {
        auth: 'jwt',
        // auth: false,
        description:
            'Put - update todo by userId, updateTodoId, updateTodo, updateTodoStatus',
        notes: ["Returns all the todo's with the updated todo"],
        tags: ['api'],
        cors: true,
        validate: {
            payload: Schema.updateTaskSchema,
        },
    },
};

const deleteTodoRoute = {
    method: 'DELETE',
    path: '/todo',
    handler: Handler.deleteTodoRouteHandler,
    config: {
        auth: 'jwt',
        // auth: false,
        description: 'Delete - remove todo by userId, deleteTodoId',
        notes: ['Returns whether the given todoId is deleted or not'],
        tags: ['api'],
        cors: true,
        validate: {
            payload: Schema.deleteTaskSchema,
        },
    },
};

module.exports = {
    defaultRoute,
    getTodoRoute,
    createTodoRoute,
    updateTodoRoute,
    deleteTodoRoute,
    signupRoute,
    loginRoute,
};
