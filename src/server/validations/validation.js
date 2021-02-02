'use strict';

const Joi = require('joi');

const signupSchema = Joi.object({
    emailId: Joi.string().email().required().description('emailId for signup'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password for signup'),
});

const loginSchema = Joi.object({
    emailId: Joi.string()
        .email()
        .required()
        .description('emailId of the registered user'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .description('password of the registered user'),
});

const getTasksSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
});

const createTaskSchema = Joi.object({
    userId: Joi.string()
        .required()
        .min(36)
        .max(36)
        .description('userId of type uuid - v4'),
    todo: Joi.string().required().description('todo to create task'),
    todoStatus: Joi.string()
        .required()
        .description('todoStatus whether it is completed or not'),
});

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
});

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
});

module.exports = {
    signupSchema,
    loginSchema,
    getTasksSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
};
