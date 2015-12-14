'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('gruew-logger');
var RequestHandler = require('./request-handler');
var DbFiller = require('./db-filler');
var config = require('./config');

function App() {
    this.run = function () {
        if (process.argv.length > 2 && process.argv[2] === 'filldb') {
            logger.log(['Filling the database'], __filename, false);
            DbFiller.fill();
        } else {
            var app = express();
            app.use(bodyParser.json());

            app.post('/record-by-id', RequestHandler.getRecordById);
            app.post('/all-records', RequestHandler.getAllRecords);
            app.post('/save-records', RequestHandler.saveRecords);

            var port = config.port;
            var server = app.listen(port, function () {
                logger.log(
                    ['camplight server running on port:', port],
                    __filename,
                    false
                );
            });
        }
    }
}

module.exports = App;
