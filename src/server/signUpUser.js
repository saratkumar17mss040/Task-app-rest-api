const Uuid = require('uuid');
const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'Users';
const userId = Uuid.v4();
const emailId = 'jake123@gmail.com';
const password = '910';

const params = {
    TableName: table,
    KeyConditionExpression: '#emailId = :id',
    ExpressionAttributeNames: {
        '#emailId': 'emailId',
    },
    ExpressionAttributeValues: {
        ':id': emailId,
    },
};

console.log('Adding one user...');

docClient.query(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to query the user. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else if (data.Items.length) {
        console.error('This email is already registered');
    } else {
        const params = {
            TableName: table,
            Item: {
                userId: userId,
                emailId: emailId,
                password: password,
            },
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.error(
                    'Unable to add the user',
                    JSON.stringify(err, null, 2),
                );
            } else {
                console.log(
                    'Added user successfully',
                    JSON.stringify(data, null, 2),
                );
            }
        });
    }
});
