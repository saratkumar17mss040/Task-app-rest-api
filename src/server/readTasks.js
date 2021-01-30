const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'UsersTodo';
const userId = '71a7a490-c132-42c8-ac45-91884a5e9508';
const emailId = 'sam123@gmail.com';

const params = {
    TableName: table,
    Key: {
        userId: userId,
        emailId: emailId,
    },
    Return_values: 'ALL_NEW',
};

console.log('Reading tasks for the given user...');

docClient.get(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to read the tasks for the given user. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Tasks readed successfully :',
            JSON.stringify(data, null, 2),
        );
    }
});

// first read
// read -> update -> 