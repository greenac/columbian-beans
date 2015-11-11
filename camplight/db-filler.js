'use strict';

var jsonFile = require('jsonfile');
var DbWrapper = require('./db-wrapper');
var Logger = require('./logger');
var path = require('path');

module.exports = {
    fill: function() {
        var filePath = path.join(__dirname, 'files/create-clients.json');
        var clients = jsonFile.readFileSync(filePath);
        var dbWrapper = new DbWrapper('camplight');
        dbWrapper.insert('clients', clients, function (error, result) {
            if (error) {
                Logger.log('Failed to fill clients database', __filename, true, false);
                return;
            }

            Logger.log('Filled clients database', __filename, false, false);
        });
    }
};
