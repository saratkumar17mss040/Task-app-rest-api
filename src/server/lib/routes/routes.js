'use strict';

const Handler = require('../../handlers/handler');
const Schema = require('../../schema/schema');

// All server routes
const defaultRoute = {
    method: 'GET',
    path: '/active',
    handler: Handler.defaultRouteHandler,
    config: {
        auth: false,
        description: 'Get - server active route',
        notes: ['Returns the default todo route response'],
        tags: ['api', 'active'],
        cors: true,
    },
};

const getTodoRoute = {
    method: 'GET',
    path: '/todoList',
    handler: Handler.getTodoRouteHandler,
    config: {
        auth: 'jwt',
        description: 'Get - todo by userId',
        notes: ["Returns all the todo's for the given userId"],
        tags: ['api', 'todoGet'],
        cors: true,
        validate: {
            query: Schema.getTasksSchema,
        },
        // response: {
        //     schema: Schema.getTasksResponseSchema,
        // },
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
        tags: ['api', 'signup'],
        cors: true,
        validate: {
            payload: Schema.signupSchema,
        },
        response: {
            schema: Schema.signupResponseSchema,
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
        tags: ['api', 'login'],
        cors: true,
        validate: {
            payload: Schema.loginSchema,
        },
        response: {
            schema: Schema.loginResponseSchema,
        },
    },
};

const createTodoRoute = {
    method: 'POST',
    path: '/todo',
    handler: Handler.createTodoRouteHandler,
    config: {
        auth: 'jwt',
        description: 'Post - submit todo by userId, todo, todoStatus',
        notes: ["Returns all the todo's with the submitted todo"],
        tags: ['api', 'todo'],
        cors: true,
        validate: {
            payload: Schema.createTaskSchema,
        },
        // response: {
        // schema: Schema.createTaskResponseSchema,
        // },
    },
};

const updateTodoRoute = {
    method: 'PUT',
    path: '/todo',
    handler: Handler.updateTodoRouteHandler,
    config: {
        auth: 'jwt',
        description: 'Put - update todo by userId, todoId, todo, todoStatus',
        notes: ["Returns all the todo's with the updated todo"],
        tags: ['api', 'todo'],
        cors: true,
        validate: {
            payload: Schema.updateTaskSchema,
        },
        response: {
            schema: Schema.updateTaskResponseSchema,
        },
    },
};

const deleteTodoRoute = {
    method: 'DELETE',
    path: '/todo',
    handler: Handler.deleteTodoRouteHandler,
    config: {
        auth: 'jwt',
        description: 'Delete - remove todo by userId, todoId',
        notes: ['Returns whether the given todoId is deleted or not'],
        tags: ['api', 'todo'],
        cors: true,
        validate: {
            payload: Schema.deleteTaskSchema,
        },
        response: {
            schema: Schema.deleteTaskResponseSchema,
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
