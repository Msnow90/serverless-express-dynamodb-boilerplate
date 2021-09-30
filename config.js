module.exports = {
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',

        endpoints: {
            development: process.env.AWS_DEV_ENDPOINT || 'https://mkiyafyo94.execute-api.us-east-1.amazonaws.com/dev'
        }
    },

}