const Schema = require('../validations/validation');
const Jwt = require('jsonwebtoken');
const Uuid = require('uuid');
// const Users = require('../database');
const DBOperations = require('../dbOperations');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

// const db = new AWS.DynamoDB.DocumentClient();
require('dotenv').config();

function defaultRouteHandler(request, reply) {
    return {
        message: 'Basic 📑 task-rest api using hapijs 😎 !',
    };
}

async function signupRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = Schema.signupSchema.validate(request.payload);

    // console.log(value, error);

    if (error) {
        return error.details;
    } else {
        // Users.push({ id: Uuid.v4(), emailId, password });
        const checkIsUserExistParams = {
            TableName: 'Users',
            KeyConditionExpression: '#emailId = :id',
            ExpressionAttributeNames: {
                '#emailId': 'emailId',
            },
            ExpressionAttributeValues: {
                ':id': emailId,
            },
        };

        const user = await DBOperations.query(checkIsUserExistParams);
        if (user.Items.length) {
            return {
                message:
                    'User already registered with this emailId. Try using another emailId !',
            };
        } else {
            const signupParams = {
                TableName: 'Users',
                Item: {
                    userId: Uuid.v4(),
                    emailId: emailId,
                    password: password,
                },
            };

            await DBOperations.put(signupParams);
            return { message: 'Successful signup !' };
        }
    }
}

async function loginRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = await Schema.loginSchema.validate(request.payload);

    // console.log(value, error);

    if (error) {
        return error.details;
    } else {
        const checkLoginParams = {
            TableName: 'Users',
            KeyConditionExpression: '#emailId = :eId',
            FilterExpression: '#password = :pwd',
            ExpressionAttributeNames: {
                '#emailId': 'emailId',
                '#password': 'password',
            },
            ExpressionAttributeValues: {
                ':eId': emailId,
                ':pwd': password,
            },
        };
        const user = await DBOperations.query(checkLoginParams);
        if (user.Items.length === 0) {
            return {
                message:
                    'Entered emailId and password is not correct. Please enter registered emailId and password !',
            };
        } else {
            // console.log('Logging in...');
            const jwtUserToken = Jwt.sign(
                { emailId, password },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' },
            );
            // console.log(jwtUserToken);
            return { message: 'Successful login !,', token: jwtUserToken };
        }
    }
}

async function getTodoRouteHandler(request, response) {
    const userId = request.params.userId || undefined;
    const { value, error } = await Schema.getTasksSchema.validate({ userId });

    // console.log('userId');
    // console.log(userId);
    // console.log('value, error');
    // console.log(value, error);

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

        // console.log('Reading tasks for the given user...');

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

    // console.log(value, error);

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
                    'Entered userId does not exist in the database. Please enter registered userId to add todo !',
            };
        } else {
            const createTaskParams = {
                TableName: 'Tasks',
                Item: {
                    createdAt: Date.now(),
                    userId: userId,
                    todoId: Uuid.v4(),
                    todo: todo,
                    todoStatus: todoStatus,
                },
            };

            // console.log('Inserting task for the given user...');

            await DBOperations.put(createTaskParams);
            return { message: 'Task added successfully' };
        }
    }
}

async function updateTodoRouteHandler(request, response) {
    const { userId, updateTodoId, updateTodo, updateTodoStatus } =
        request.payload || {};

    // console.log(request.payload);
    // console.log(value, error);

    const { value, error } = await Schema.updateTaskSchema.validate(
        request.payload,
    );

    if (error) {
        return error.details;
    } else {
        const readTasksParams = {
            TableName: 'Tasks',
            KeyConditionExpression: '#userId = :id AND #taskId = :todoId',
            ExpressionAttributeNames: {
                '#userId': 'userId',
                '#taskId': 'todoId',
            },
            ExpressionAttributeValues: {
                ':id': userId,
                ':todoId': updateTodoId,
            },
        };

        const getTasks = await DBOperations.query(readTasksParams);
        if (getTasks.Items.length === 0) {
            return {
                message:
                    'Entered userId and taskId does not exist in the database. Please enter registered userId and taskId to update the todo !',
            };
        } else {
            const updateTaskParams = {
                TableName: 'Tasks',
                Key: {
                    userId: userId,
                    todoId: updateTodoId,
                },
                UpdateExpression: 'set todo = :task , todoStatus = :status',
                ExpressionAttributeValues: {
                    ':task': updateTodo,
                    ':status': updateTodoStatus,
                },
                ReturnValues: 'UPDATED_NEW',
            };

            // console.log('Updating task for the given user...');
            await DBOperations.update(updateTaskParams);
            return { message: 'Task updated successfully' };
        }
    }
}

async function deleteTodoRouteHandler(request, response) {
    const { userId, deleteTodoId } = request.payload || {};
    const { value, error } = await Schema.deleteTaskSchema.validate(
        request.payload,
    );

    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        const readTasksParams = {
            TableName: 'Tasks',
            KeyConditionExpression: '#userId = :id AND #taskId = :todoId',
            ExpressionAttributeNames: {
                '#userId': 'userId',
                '#taskId': 'todoId',
            },
            ExpressionAttributeValues: {
                ':id': userId,
                ':todoId': deleteTodoId,
            },
        };

        const getTasks = await DBOperations.query(readTasksParams);
        console.log(getTasks);
        if (getTasks.Items.length === 0) {
            return {
                message:
                    'Entered userId and taskId does not exist in the database. Please enter registered userId and taskId to delete the todo !',
            };
        } else {
            const deleteTaskParams = {
                TableName: 'Tasks',
                Key: {
                    userId: userId,
                    todoId: deleteTodoId,
                },
                ConditionExpression: 'todoId = :taskId',
                ExpressionAttributeValues: {
                    ':taskId': deleteTodoId,
                },
            };
            console.log('Attempting a conditional delete...');
            await DBOperations.del(deleteTaskParams);
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
