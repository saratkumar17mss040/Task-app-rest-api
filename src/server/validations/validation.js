'use strict';

const Joi = require('joi');

// All server data validation
const signupSchema = Joi.object({
    emailId: Joi.string()
        .email()
        .required()
        .description('emailId for signup')
        .default('ramabot123@gmail.com'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password for signup')
        .default('456'),
});

const loginSchema = Joi.object({
    emailId: Joi.string()
        .email()
        .required()
        .description('emailId of the registered user')
        .default('sam123@gmail.com'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password of the registered user')
        .default('123'),
});

const getTasksSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4')
        .default('cf6b6ee0-5f81-4166-b51b-d1994aaf3307'),
});

const createTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4')
        .default('cf6b6ee0-5f81-4166-b51b-d1994aaf3307'),
    todo: Joi.string()
        .required()
        .description('todo to create task')
        .default('Buy laptop'),
    todoStatus: Joi.string()
        .required()
        .description('todoStatus whether it is completed or not')
        .default('not completed'),
});

const updateTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4')
        .default('cf6b6ee0-5f81-4166-b51b-d1994aaf3307'),
    updateTodoId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('updateTodoId for updating the specific todo')
        .default('71a7a490-c132-42c8-ac45-91884a5e9508'),
    updateTodo: Joi.string()
        .required()
        .description('updateTodo for actual todo update')
        .default('Buy popcorn'),
    updateTodoStatus: Joi.string()
        .required()
        .description(
            'updateTodoStatus to update whether the todo is completed or not',
        )
        .default('completed'),
});

const deleteTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4')
        .default('cf6b6ee0-5f81-4166-b51b-d1994aaf3307'),
    deleteTodoId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('deleteTodoId to delete todo by id')
        .default('71a7a490-c132-42c8-ac45-91884a5e9508'),
});

module.exports = {
    signupSchema,
    loginSchema,
    getTasksSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
};
