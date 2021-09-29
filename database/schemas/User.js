module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
    
        phone: {
            type: 'string'
        },
    
        firstName: {
            type: 'string'
        },
    
        middleInitial: {
            type: 'string'
        },
    
        lastName: {
            type: 'string'
        },
    
        gender: {
            type: 'string'
        }

    },

    required: ['email', 'firstName', 'lastName'],
    additionalProperties: false
}