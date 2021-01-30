const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'UsersTodo';

const params = {
    TableName: table,
    Key: {
        year: year,
        title: title,
    },
    // ConditionExpression: 'info.rating <= :val',
    // ExpressionAttributeValues: {
    // 	':val': 5.0,
    // },
};

console.log('Attempting a conditional delete...');
docClient.delete(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to delete item. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
    }
});
