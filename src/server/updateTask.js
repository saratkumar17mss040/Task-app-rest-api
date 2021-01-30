const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'UsersTodo';
const todoId = '71a7a490-c132-42c8-ac45-91884a5e9508';
const todo = 'Buy phone';
const userId = '8ce1d9be-357b-4403-a6cc-312382db5d22';
// cf6b6ee0 - 5f81 - 4166 - b51b - d1994aaf3307';
// const emailId = 'sam123@gmail.com';

const params = {
    TableName: table,
    KeyConditionExpression: '#uId = :userId',
    ExpressionAttributeNames: {
        '#uId': 'userId',
    },
    ExpressionAttributeValues: {
        ':userId': userId,
    },
    ReturnValues: 'UPDATED_NEW',
};

// const params = {
//     TableName: 'UsersTodo',
//     Key: {
//         todoId: todoId,
//     },
//     UpdateExpression: 'set task'
// };

function createParams(index) {
    return {
        TableName: table,
        Key: { todoId: todoId },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `set tasks[${index}].todo = :task`,
        ConditionExpression: `tasks[${index}].todoId = :taskId`,
        ExpressionAttributeValues: {
            ':taskId': todoId,
            ':task': todo,
        },
    };
}

console.log('Updating task for the given user...');

docClient.query(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to query the tasks. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        // create params for each object
        const currentUserItems = data.Items;
        console.log(currentUserItems[0].tasks);
        currentUserItems[0].tasks.forEach((task, index) => {
            // if (task.todoId === todoId) {
            //     task.todo = todo;
            //     console.log(task.todo);
            // }
            createParams(index);
        });

        console.log(
            'Task updated successfully :',
            JSON.stringify(data, null, 2),
        );
    }
});
