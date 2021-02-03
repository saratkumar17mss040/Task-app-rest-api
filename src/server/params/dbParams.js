'use strcit';

// const Schema = require('../validations/validation');
const Uuid = require('uuid');

function checkIsUserExist(emailId) {
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
    return checkIsUserExistParams;
}

function signup(emailId, password) {
    const signupParams = {
        TableName: 'Users',
        Item: {
            userId: Uuid.v4(),
            emailId: emailId,
            password: password,
        },
    };
    return signupParams;
}

function checkLogin(emailId, password) {
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
    return checkLoginParams;
}

function readTasks(userId) {
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
    return readTasksParams;
}

function createTask(userId, todo, todoStatus) {
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
    return createTaskParams;
}

function readTasksForUpdate(userId, updateTodoId) {
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

    return readTasksParams;
}

function updateTask(userId, updateTodoId, updateTodo, updateTodoStatus) {
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
    return updateTaskParams;
}

function readTasksForDelete(userId, deleteTodoId) {
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
    return readTasksParams;
}

function deleteTask(userId, deleteTodoId) {
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
    return deleteTaskParams;
}

module.exports = {
    checkIsUserExist,
    signup,
    checkLogin,
    readTasks,
    readTasksForUpdate,
    readTasksForDelete,
    createTask,
    updateTask,
    deleteTask,
};
