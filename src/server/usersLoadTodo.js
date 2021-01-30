const Aws = require('aws-sdk');
const Fs = require('fs');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

console.log('Importing UsersTodo data into DynamoDB. Please wait.');

const users = JSON.parse(Fs.readFileSync('UsersTodo.json'));

users.forEach(function (user) {
    const params = {
        TableName: 'UsersTodo',
        Item: {
            userId: user.userId,
            emailId: user.emailId,
            password: user.password,
            tasks: user.tasks,
        },
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(
                'Unable to add user',
                user.emailId,
                '. Error JSON:',
                JSON.stringify(err, null, 2),
            );
        } else {
            console.log('PutItem succeeded:', user);
            console.log('Data', data);
        }
    });
});
