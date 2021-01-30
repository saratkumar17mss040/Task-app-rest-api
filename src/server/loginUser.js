const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'Users';
const emailId = 'jake123@gmail.com';
const password = '910';

const params = {
    TableName: table,
    KeyConditionExpression: '#emailId = :eId',
    ExpressionAttributeNames: {
        '#emailId': 'emailId',
    },
    ExpressionAttributeValues: {
        ':eId': emailId,
    },
};

console.log('Logging in...');

docClient.query(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to login. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else if (!data.Items.length) {
        console.error('User not registered');
    } else if (data.Items[0].password !== password) {
        console.log('Invalid password');
    } else {
        console.log('User logged in successfully');
    }
    // console.log(data);
});
