const Uuid = require('uuid');
const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});


const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'UsersTodo';
const userId = Uuid.v4();
const emailId = 'chris123@gmail.com';
const password = '789';

const params = {
    TableName: table,
    Item: {
        userId: userId,
        emailId: emailId,
        password: password,
        tasks: [],
    },
};

console.log('Adding one user...');

docClient.put(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to add the user. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log('Added user successfully :', JSON.stringify(data, null, 2));
    }
});
