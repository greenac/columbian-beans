'use strict';

var DbWrapper = require('./db-wrapper');
var JsonResponse = require('./json-response');
var Logger = require('./logger');

module.exports = {
    getRecordById: function (req, res) {
        var postData = req.body;
        var dbWrapper = new DbWrapper(postData.database);
        dbWrapper.retrieveWithId(postData.collection, postData.id, function (error, result) {
            var jsonResponse = new JsonResponse(error, result, res);
            jsonResponse.respond();
        });
    },

    getMultipleRecords: function (req, res) {

    },

    getAllRecords: function (req, res) {
        Logger.log(
            'getting all records for: ' + JSON.stringify(req.body),
            __filename,
            false,
            false
        );

        var postData = req.body;
        var dbWrapper = new DbWrapper(postData.database);
        dbWrapper.retrieveAll(postData.collection, function (error, result) {
            var jsonResponse = new JsonResponse(error, result, res);
            jsonResponse.respond();
        });
    },

    saveRecords: function (req, res) {
        Logger.log('Saving record: ' + JSON.stringify(req.body), __filename, false, false);
        var dbWrapper = new DbWrapper(req.body.database);
        dbWrapper.insert(req.body.collection, req.body.payload, function (error, result) {
            var message = null;
            if (!error && req.body.payload._id) {
                message = 'successfully saved object with _id: '  + req.body.payload._id;
            }

            var jsonResponse = new JsonResponse(error, message, res);
            jsonResponse.respond();
        });
    }
};