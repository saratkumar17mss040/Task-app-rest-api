const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new Aws.DynamoDB.DocumentClient();

const table = 'Tasks';
const userId = 'cf6b6ee0-5f81-4166-b51b-d1994aaf3307';

const params = {
    TableName: table,
    KeyConditionExpression: '#userId = :id',
    ExpressionAttributeNames: {
        '#userId': 'userId',
    },
    ExpressionAttributeValues: {
        ':id': userId,
    },
};

console.log('Reading tasks for the given user...');

docClient.query(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to read the tasks for the given user. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Tasks readed successfully :',
            JSON.stringify(data.Items, null, 2),
        );
    }
});
