'use strict';

const Jwt = require('jsonwebtoken');
const DBOperations = require('../dbOperations');
const Schema = require('../validations/validation');
const DBparams = require('../params/dbParams');
require('dotenv').config();
require('../dbOperations');

// All server handler functions
function defaultRouteHandler(request, reply) {
    return {
        message: 'Basic 📑 task-rest api using hapijs 😎 !',
    };
}

async function signupRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = await Schema.signupSchema.validate(
        request.payload,
    );

    if (error) {
        return error.details;
    } else {
        const user = await DBOperations.query(
            DBparams.checkIsUserExist(emailId),
        );
        if (user.Items.length) {
            return {
                message:
                    'User already registered with this emailId. Try using another emailId !',
            };
        } else {
            const signup = DBparams.signup(emailId, password);
            await DBOperations.put(signup);
            return {
                message: 'Successful signup !',
                userId: signup.Item.userId,
            };
        }
    }
}

async function loginRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = await Schema.loginSchema.validate(request.payload);

    if (error) {
        return error.details;
    } else {
        const user = await DBOperations.query(
            DBparams.checkLogin(emailId, password),
        );
        if (user.Items === undefined) {
            return {
                message:
                    'Entered emailId and password is not correct. Please enter registered emailId and password !',
            };
        } else {
            const jwtUserToken = Jwt.sign(
                { emailId, password },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' },
            );
            return { message: 'Successful login !,', token: jwtUserToken };
        }
    }
}

async function getTodoRouteHandler(request, response) {
    const userId = request.params.userId || undefined;
    const { value, error } = await Schema.getTasksSchema.validate({ userId });

    if (error) {
        return error.details;
    } else {
        const readTasksParams = {
            TableName: 'Tasks',
            KeyConditionExpression: '#userId = :id',
            ExpressionAttributeNames: {
                '#userId': 'userId',
            },
            ExpressionAttributeValues: {
                ':id': userId,
            },
        };

        const getTasks = await DBOperations.query(readTasksParams);
        if (getTasks.Items.length === 0) {
            return {
                message:
                    "Entered userId does not exist in the database. Please enter registered userId to read todo's !",
            };
        }
        return getTasks.Items;
    }
}

async function createTodoRouteHandler(request, response) {
    const { userId, todo, todoStatus } = request.payload || {};
    const { value, error } = await Schema.createTaskSchema.validate(
        request.payload,
    );

    if (error) {
        return error.details;
    } else {
        const getTasks = await DBOperations.query(DBparams.readTasks(userId));
        if (getTasks.Items.length === 0) {
            return {
                message:
                    'Entered userId does not exist in the database. Please enter registered userId to add todo !',
            };
        } else {
            const task = DBparams.createTask(userId, todo, todoStatus);
            await DBOperations.put(task);
            return {
                message: 'Task added successfully',
                todoId: task.Item.todoId,
            };
        }
    }
}

async function updateTodoRouteHandler(request, response) {
    const { userId, updateTodoId, updateTodo, updateTodoStatus } =
        request.payload || {};

    const { value, error } = await Schema.updateTaskSchema.validate(
        request.payload,
    );

    if (error) {
        return error.details;
    } else {
        const getTasks = await DBOperations.query(
            DBparams.readTasksForUpdate(userId, updateTodoId),
        );
        if (getTasks.Items.length === 0) {
            return {
                message:
                    'Entered userId and taskId does not exist in the database. Please enter registered userId and taskId to update the todo !',
            };
        } else {
            await DBOperations.update(
                DBparams.updateTask(
                    userId,
                    updateTodoId,
                    updateTodo,
                    updateTodoStatus,
                ),
            );
            return { message: 'Task updated successfully' };
        }
    }
}

async function deleteTodoRouteHandler(request, response) {
    const { userId, deleteTodoId } = request.payload || {};
    const { value, error } = await Schema.deleteTaskSchema.validate(
        request.payload,
    );

    if (error) {
        return error.details;
    } else {
        const getTasks = await DBOperations.query(
            DBparams.readTasksForDelete(userId, deleteTodoId),
        );
        if (
            getTasks.Items.length === undefined ||
            getTasks.Items.length === 0
        ) {
            return {
                message:
                    'Entered userId and taskId does not exist in the database. Please enter registered userId and taskId to delete the todo !',
            };
        } else {
            await DBOperations.del(DBparams.deleteTask(userId, deleteTodoId));
            return {
                message: 'Task deleted successfully',
            };
        }
    }
}

module.exports = {
    defaultRouteHandler,
    signupRouteHandler,
    loginRouteHandler,
    getTodoRouteHandler,
    createTodoRouteHandler,
    updateTodoRouteHandler,
    deleteTodoRouteHandler,
};
