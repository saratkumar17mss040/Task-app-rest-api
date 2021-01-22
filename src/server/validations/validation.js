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
    userId: Joi.string().required(),
});

const createTaskSchema = Joi.object({
    userId: Joi.string().required(),
    todo: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
    userId: Joi.string().required(),
    updateTodoId: Joi.string().required(),
    updateTodo: Joi.string(),
});

const deleteTaskSchema = Joi.object({
    deleteTodoId: Joi.string().required(),
});

module.exports = {
    signupSchema,
    loginSchema,
    getTasksSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema,
};
