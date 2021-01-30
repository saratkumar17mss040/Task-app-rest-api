const Aws = require('aws-sdk');
const Fs = require('fs');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

console.log('Importing tasks data into DynamoDB. Please wait.');

const tasks = JSON.parse(Fs.readFileSync('Tasks.json'));

tasks.forEach(function (task) {
    const params = {
        TableName: 'Tasks',
        Item: {
            createdAt: task.createdAt,
            userId: task.userId,
            todoId: task.todoId,
            todo: task.todo,
        },
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(
                'Unable to add tasks',
                user.emailId,
                '. Error JSON:',
                JSON.stringify(err, null, 2),
            );
        } else {
            console.log('Task added successfully:', task);
        }

        
    });
});
