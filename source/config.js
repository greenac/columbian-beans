'use strict';

var path = require('path');

var appName = 'columbian-beans';

module.exports = {
    appName: appName,
    port: process.env.COLUMBIAN_BEANS_PORT || 9042,
    logFilePath: path.join(__dirname, 'files', appName + '.log')
};