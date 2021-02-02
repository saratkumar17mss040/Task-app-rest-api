'use strict';

const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: process.env.END_POINT,
});

module.exports = AWS;