const dynamoDb = require('../db');
const USERS_TABLE = process.env.USERS_TABLE;

module.exports.getUser = (userId) => {

    return new Promise((resolve, reject) => {
        const params = {
            TableName: USERS_TABLE,
            Key: {
                userId
            }
        }
    
        dynamoDb.get(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error: 'Could not get user.', source: 'dynamodb' });
            }
            if (result.Item)
                resolve(result.Item);
            else
                resolve({});
        })

    })
}


module.exports.createUser = (payload) => {

    return new Promise((resolve, reject) => {
        const params = {
            TableName: USERS_TABLE,
            Item: {
                payload
            }
        }
    
        dynamoDb.put(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error, source: 'dynamodb' });
            }
            
            if (result)
                resolve(result);

            else
                reject({ statusCode: 400, error: 'Unknown error occurred on DB for User Service - createUser method.', source: 'dynamodb' });
        })

    })
}