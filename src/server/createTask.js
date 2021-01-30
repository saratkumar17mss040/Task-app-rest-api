const AWS = require('aws-sdk');
const Uuid = require('uuid');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'UsersTodo';

const userId = 'c09022e0-14db-473d-89b8-9bae07a9620d';
const emailId = 'chris123@gmail.com';
// 789
const password = '789';
const todo = 'Buy phone';

const fullTodo = {
    createdAt: `${Date.now()}`,
    todoId: Uuid.v4(),
    todo: todo,
};

const params = {
    TableName: table,
    Key: {
        userId: userId,
        emailId: emailId,
    },
    Item: {
        userId: userId,
        emailId: emailId,
    },
    ConditionExpression: 'userId = :uId AND password = :pwd',
    UpdateExpression:
        'set  #todo = list_append(if_not_exists(#todo, :empty_list), :todo)',
    ExpressionAttributeNames: {
        '#todo': 'tasks',
    },
    ExpressionAttributeValues: {
        ':uId': userId,
        ':pwd': password,
        ':todo': [fullTodo],
        ':empty_list': [],
    },
};

docClient.update(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to add todo. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log('Added todo successfully:', JSON.stringify(data, null, 2));
    }
});
