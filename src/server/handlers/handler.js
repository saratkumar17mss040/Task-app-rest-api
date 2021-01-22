const Schema = require('../validations/validation');
const Jwt = require('jsonwebtoken');
const Uuid = require('uuid');
const Users = require('../database');
require('dotenv').config();

function defaultRouteHandler(request, reply) {
    return {
        message: 'Basic task-rest api using hapijs :) !',
    };
}

function signupRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = Schema.signupSchema.validate(request.payload);

    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        Users.push({ id: Uuid.v4(), emailId, password });
        return { message: 'Successful signup !' };
    }
}

function loginRouteHandler(request, response) {
    const { emailId, password } = request.payload || {};
    const { value, error } = Schema.loginSchema.validate(request.payload);

    console.log(value, error);

    if (error) {
        return error.details;
    } else if (Users[0].emailId === emailId && Users[0].password === password) {
        const jwtUserToken = Jwt.sign(
            { emailId, password },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' },
        );
        console.log(jwtUserToken);
        return { message: 'Successful login !,', token: jwtUserToken };
    } else {
        return { message: 'Incorrect username or password !' };
    }
}

function getTodoRouteHandler(request, response) {
    const userId = request.params.userId || undefined;
    const { value, error } = Schema.getTasksSchema.validate({ userId });

    console.log(userId);
    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        for (let i = 0; i < Users.length; i++) {
            if (Users[i].userId === userId) {
                return { tasks: Users[i].tasks };
            }
        }
        return {
            message: "Please enter existing userId to see existing todo's !",
        };
    }
}

function createTodoRouteHandler(request, response) {
    const { userId, todo } = request.payload || {};
    const { value, error } = Schema.createTaskSchema.validate(request.payload);

    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        for (let i = 0; i < Users.length; i++) {
            if (Users[i].userId === userId) {
                Users[i].tasks.push({
                    createdAt: `${Date.now()}`,
                    todoId: Uuid.v4(),
                    todo: todo,
                });
                return { tasks: Users[i].tasks };
            }
        }
        return {
            message: "Please enter existing userId to enter todo's !",
        };
    }
}

function updateTodoRouteHandler(request, response) {
    const { userId, updateTodoId, updateTodo } = request.payload || {};
    const { value, error } = Schema.updateTaskSchema.validate(request.payload);

    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        for (let i = 0; i < Users.length; i++) {
            for (let j = 0; j < Users[i].tasks.length; j++) {
                if (
                    Users[i].tasks[j].todoId === updateTodoId &&
                    Users[i].userId === userId
                ) {
                    Users[i].tasks[j].todo = updateTodo;
                    return {
                        tasks: Users[i].tasks,
                    };
                }
            }
        }
        return {
            message:
                'Please enter exisitng userId and updateTodoId to update todo !',
        };
    }
}

function deleteTodoRouteHandler(request, response) {
    const { deleteTodoId } = request.payload || {};
    const { value, error } = Schema.deleteTaskSchema.validate(request.payload);

    console.log(value, error);

    if (error) {
        return error.details;
    } else {
        for (let i = 0; i < Users.length; i++) {
            for (let j = 0; j < Users[i].tasks.length; j++) {
                if (Users[i].tasks[j].todoId === deleteTodoId) {
                    Users[i].tasks.splice(j, 1);
                    return { tasks: Users[i].tasks };
                }
            }
        }
        return {
            message: 'Please enter an existing todoItem to be deleted !',
        };
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
