const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const dynamodb = new Aws.DynamoDB();

const UsersTableSchema = {
    TableName: 'Tasks',
    KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'todoId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'userId',
            AttributeType: 'S',
        },
        {
            AttributeName: 'todoId',
            AttributeType: 'S',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};

dynamodb.createTable(UsersTableSchema, function (err, data) {
    if (err) {
        console.error(
            'Unable to create tasks table. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Created tasks table. Table description JSON:',
            JSON.stringify(data, null, 2),
        );
    }
});
