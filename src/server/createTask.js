const Uuid = require('uuid');
const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'Tasks';
const userId = 'cf6b6ee0-5f81-4166-b51b-d1994aaf3307';
const todo = 'Buy pizza';
const todoStatus = 'not completed';

const params = {
    TableName: table,
    // Key: {
    //     userId: userId,
    // },
    Item: {
        createdAt: Date.now(),
        userId: userId,
        todoId: Uuid.v4(),
        todo: todo,
        todoStatus: todoStatus,
    },
};

console.log('Inserting task for the given user...');

docClient.put(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to insert the task for the given user. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Task inserted successfully :',
            JSON.stringify(data, null, 2),
        );
    }
});
