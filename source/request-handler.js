'use strict';

var DbWrapper = require('./db-wrapper');
var jsonResponse = require('./json-response');
var logger = require('gruew-logger');

module.exports = {
    getRecordById: function (req, res) {
        var postData = req.body;
        var dbWrapper = new DbWrapper(postData.database);
        dbWrapper.retrieveWithId(postData.collection, postData.id, function (error, result) {
            jsonResponse(error, result, res);
        });
    },

    getMultipleRecords: function (req, res) {

    },

    getAllRecords: function (req, res) {
        logger.log(
            ['getting all records for:', req.body],
            __filename,
            false
        );

        var postData = req.body;
        var dbWrapper = new DbWrapper(postData.database);
        dbWrapper.retrieveAll(postData.collection, function (error, result) {
            jsonResponse(error, result, res);
        });
    },

    saveRecords: function (req, res) {
        logger.log(['Saving record:', req.body], __filename, false);
        var dbWrapper = new DbWrapper(req.body.database);
        dbWrapper.insert(req.body.collection, req.body.payload, function (error, result) {
            var message = null;
            if (!error && req.body.payload._id) {
                message = 'successfully saved object with _id: '  + req.body.payload._id;
            }

            jsonResponse(error, message, res);
        });
    }
};
