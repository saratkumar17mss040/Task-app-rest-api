const Joi = require('joi');

const signupSchema = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

const loginSchema = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

const getTasksSchema = Joi.object({
    userId: Joi.string().required().min(36).max(36),
});

const createTaskSchema = Joi.object({
    userId: Joi.string().required().min(36).max(36),
    todo: Joi.string().required(),
    todoStatus: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
    userId: Joi.string().required().min(36).max(36),
    updateTodoId: Joi.string().required().min(36).max(36),
    updateTodo: Joi.string().required(),
    updateTodoStatus: Joi.string().required(),
});

const deleteTaskSchema = Joi.object({
    userId: Joi.string().required().min(36).max(36),
    deleteTodoId: Joi.string().required().min(36).max(36),
});

module.exports = {
    signupSchema,
    loginSchema,
    getTasksSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
};
