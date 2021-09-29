const { log } = require('./loggerDrivers');

// All error reporting goes through here. Can further break down errors and/or utilize various procedures to report errors.

module.exports = function(customMessage, err) {

    if (err.source == 'dynamodb') {
        // allows for more universal formatting of error codes, rather than having to apply everywhere
    }

    log(`${customMessage}`);
    log(err);
    log(`Original stack trace: ${err.stack}`)

}