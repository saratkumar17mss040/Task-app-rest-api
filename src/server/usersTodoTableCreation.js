const Uuid = require('uuid');
const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const dynamodb = new Aws.DynamoDB();

const UsersTodoTableSchema = {
    TableName: 'UsersTodo',
    KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'emailId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'userId',
            AttributeType: 'S',
        },
        {
            AttributeName: 'emailId',
            AttributeType: 'S',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};

dynamodb.createTable(UsersTodoTableSchema, function (err, data) {
    if (err) {
        console.error(
            'Unable to create table. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Created table. Table description JSON:',
            JSON.stringify(data, null, 2),
        );
    }
});
