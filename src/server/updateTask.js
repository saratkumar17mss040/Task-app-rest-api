const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const userId = '8ce1d9be-357b-4403-a6cc-312382db5d22';
const todoId = 'bb6c8ed7-cad0-41ea-909a-ff3ebdbb7e05';
const table = 'Tasks';
const todo = 'Buy phone';
const taskStatus = 'completed';

const params = {
    TableName: table,
    Key: {
        userId: userId,
        todoId: todoId,
    },
    UpdateExpression: 'set todo = :task , todoStatus = :status',
    ExpressionAttributeValues: {
        ':task': todo,
        ':status': taskStatus,
    },
    ReturnValues: 'UPDATED_NEW',
};

console.log('Updating task for the given user...');

docClient.update(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to update the tasks. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Task updated successfully :',
            JSON.stringify(data, null, 2),
        );
    }
});
