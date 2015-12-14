'use strict';

var path = require('path');

var appName = 'camplight';

module.exports = {
    appName: appName,
    port: process.env.CAMPLIGHT_PORT || 9042,
    logFilePath: path.join(__dirname, 'files', appName + '.log')
};