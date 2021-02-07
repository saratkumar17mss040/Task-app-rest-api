'use strict';

const Joi = require('joi');

// All server requests schema data validation
const signupSchema = Joi.object({
    emailId: Joi.string().email().required().description('emailId for signup'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password for signup'),
}).label('signupModel');

const loginSchema = Joi.object({
    emailId: Joi.string()
        .email()
        .required()
        .description('emailId of the registered user'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password of the registered user'),
}).label('loginModel');

const getTasksSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
}).label('getTasksModel');

const createTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
    emailId: Joi.string()
        .email()
        .required()
        .description('emailId of the registered user'),
    todo: Joi.string().required().description('todo to create task'),
    todoStatus: Joi.string()
        .required()
        .description('todoStatus whether it is completed or not'),
}).label('createTaskModel');

const updateTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
    updateTodoId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('updateTodoId for updating the specific todo'),
    updateTodo: Joi.string()
        .required()
        .description('updateTodo for actual todo update'),
    updateTodoStatus: Joi.string()
        .required()
        .description(
            'updateTodoStatus to update whether the todo is completed or not',
        ),
}).label('updateTaskModel');

const deleteTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
    deleteTodoId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('deleteTodoId to delete todo by id'),
}).label('deleteTaskModel');

// All server response schema model
const getTasksResponseSchema = Joi.array()
    .items(
        Joi.object({
            todo: Joi.string(),
            createdAt: Joi.number(),
            todoId: Joi.string(),
            userId: Joi.string(),
            todoStatus: Joi.string(),
        }).label('todo'),
    )
    .label('getTasksResponseModel');

const createTaskResponseSchema = Joi.object({
    message: Joi.string(),
    todoId: Joi.string(),
}).label('createTaskResponseModel');

const updateTaskResponseSchema = Joi.object({
    message: Joi.string(),
}).label('updateTaskResponseModel');

const deleteTaskResponseSchema = Joi.object({
    message: Joi.string(),
}).label('deleteTaskResponseModel');

const signupResponseSchema = Joi.object({
    message: Joi.string(),
    userId: Joi.string(),
}).label('signupResponseModel');

const loginResponseSchema = Joi.object({
    message: Joi.string(),
    token: Joi.string(),
}).label('loginResponseModel');

module.exports = {
    signupSchema,
    loginSchema,
    getTasksSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
    signupResponseSchema,
    loginResponseSchema,
    getTasksResponseSchema,
    createTaskResponseSchema,
    updateTaskResponseSchema,
    deleteTaskResponseSchema,
};
