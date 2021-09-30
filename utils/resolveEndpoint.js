const config = require('../config');
const endpoints = config.aws.endpoints;

module.exports = (environmentType) => {

    return endpoints[environmentType];

}