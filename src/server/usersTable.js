const Aws = require('aws-sdk');

Aws.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});

const dynamodb = new Aws.DynamoDB();

const UsersTableSchema = {
    TableName: 'Users',
    KeySchema: [{ AttributeName: 'emailId', KeyType: 'HASH' }],
    AttributeDefinitions: [
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

dynamodb.createTable(UsersTableSchema, function (err, data) {
    if (err) {
        console.error(
            'Unable to create users table. Error JSON:',
            JSON.stringify(err, null, 2),
        );
    } else {
        console.log(
            'Created users table. Table description JSON:',
            JSON.stringify(data, null, 2),
        );
    }
});
