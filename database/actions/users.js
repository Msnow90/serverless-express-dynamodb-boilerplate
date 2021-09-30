const dynamoDb = require('../db');
const uuid = require('node-uuid');

const USERS_TABLE = process.env.USERS_TABLE;

// utils
const formatUpdateParamsDB = require('../../utils/formatUpdateParamsDB'); 

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

module.exports.getUsers = () => {

    return new Promise((resolve, reject) => {
        const params = {
            TableName: USERS_TABLE
        }
    
        dynamoDb.scan(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error: 'Could not get users.', source: 'dynamodb' });
            }
            if (result.Items)
                resolve(result.Items);
            else
                resolve([]);
        })

    })
}


module.exports.createUser = (payload) => {

    return new Promise((resolve, reject) => {
        const params = {
            TableName: USERS_TABLE,
            Item: {
                ...payload,
                userId: uuid.v4()
            }
        }
    
        dynamoDb.put(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error, source: 'dynamodb' });
            }
            
            // result is blank
            if (result) {
                resolve(params.Item);
            }

            else
                reject({ statusCode: 400, error: 'Unknown error occurred on DB for User Service - createUser method.', source: 'dynamodb' });
        })

    })
}


module.exports.updateUser = (userId, updatePayload) => {

    return new Promise((resolve, reject) => {

        const formattedParams = formatUpdateParamsDB(updatePayload);
        
        const params = {
            TableName: USERS_TABLE,
            Key: {
                userId
            },
            UpdateExpression: formattedParams.updateExpression,
            ExpressionAttributeNames: formattedParams.expressionAttributeNames,
            ExpressionAttributeValues: formattedParams.expressionAttributeValues,
            ReturnValues:"UPDATED_NEW"
        }
    
        dynamoDb.update(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error, source: 'dynamodb' });
            }
            
            if (result) {
                resolve(result);
            }

            else
                reject({ statusCode: 400, error: 'Unknown error occurred on DB for User Service - updateUser method.', source: 'dynamodb' });
        })

    })
}



module.exports.deleteUser = (userId) => {

    return new Promise((resolve, reject) => {
        
        const params = {
            TableName: USERS_TABLE,
            Key: {
                userId
            }
        }
    
        dynamoDb.delete(params, (error, result) => {
            if (error) {
                reject({ statusCode: 400, error, source: 'dynamodb' });
            }
            
            if (result) {
                resolve({ deletedUserId: userId, success: true });
            }

            else
                reject({ statusCode: 400, error: 'Unknown error occurred on DB for User Service - deleteUser method.', source: 'dynamodb' });
        })

    })
}