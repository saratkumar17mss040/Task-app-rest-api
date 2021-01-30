const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Tasks';
const userId = '8ce1d9be-357b-4403-a6cc-312382db5d22';
const todoId = 'bb6c8ed7-cad0-41ea-909a-ff3ebdbb7e05';

const params = {
    TableName: table,
    Key: {
        userId: userId,
        todoId: todoId,
    },
    ConditionExpression: 'todoId = :taskId',
    ExpressionAttributeValues: {
        ':taskId': todoId,
    },
};

console.log('Attempting a conditional delete...');
docClient.delete(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to delete todo. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Deleted the todo successfully:',
            JSON.stringify(data, null, 2),
        );
    }
});
