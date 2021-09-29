const AJV = require('ajv');
const ajv = new AJV();

// schemas
const userSchema = require('../database/schemas/User');

// utils
const reportError = require('../utils/baseError');


// Enables a set way to handle schema validation errors across the board, enables the front end to drill down and demonstrate to the user accordingly
// Format to call in middleware ex: validateSchema('userSchema')
module.exports = (schemaName) => {
    
    const validate = ajv.compile(resolveSchemaByName(schemaName));

    return (req, res, next) => {
        const valid = validate(req.body);

        if (!valid) {
            reportError(validate.errors, {}, 'Schema Error');
            return res.status(422).json({ validationErrors: validate.errors });
        }

        else next();
    }

}

function resolveSchemaByName(schemaName) {
    switch(schemaName) {
        case 'userSchema':
            return userSchema;
        default:
            break;
    }
}