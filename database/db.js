const AWS                   = require('aws-sdk');
const config                = require('../config');

const dbClient = new AWS.DynamoDB.DocumentClient({ region: config.region });

module.exports = dbClient;


