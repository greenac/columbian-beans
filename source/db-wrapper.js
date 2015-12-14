'use strict';

var MongoClient = require('mongodb').MongoClient;
var logger = require('gruew-logger');
var ObjectID = require('mongodb').ObjectID;

function DbWrapper(database) {
    this.dbPath = 'mongodb://localhost:27017/' + database;

    this._connect = function(callback) {
        MongoClient.connect(this.dbPath, function (err, db) {
            if (err) {
                logger.log(
                    ['Failed to connect to db:', this.dbPath],
                    __filename,
                    true
                );

                callback(err, null);
                return;
            }

            logger.log(['Connected to database:', this.dbPath], __filename, false);

            if (callback) {
                callback(err, db);
            }
        }.bind(this));
    };

    this.insert = function(collectionName, insertObjects, callback) {
        logger.log(['Inserting objects: ', insertObjects], __filename, false);
        this._connect(function (err, db) {
            if (err) {
                logger.log(['Failed to connect to db:', this.dbPath], __filename, true);
                callback(err, null);
                return;
            }

            logger.log(['Connected to database: ', this.dbPath], __filename, false);

            logger.log(
                ['Inserting into collection:', collectionName, 'object:', insertObjects],
                __filename,
                false
            );

            var collection = db.collection(collectionName);
            collection.insertMany(insertObjects, function (error, result) {
                db.close();
                if (error) {
                    logger.log(
                        ['Inserting into collection: ', collectionName],
                        __filename,
                        true
                    );

                    callback(error, null);
                    return;
                }

                if (callback) {
                    logger.log(
                        ['Inserted:', insertObjects, '\n Into:', collectionName, '\n with response: ', result],
                        __filename,
                        false
                    );

                    callback(null, result);
                }
            });
        }.bind(this));
    };

    this.retrieveAll = function (collectionName, callback) {
        logger.log(['Retrieving objects for: ', collectionName], __filename, false);
        this._connect(function (err, db) {
            if (err) {
                logger.log(['Error: failed to connect to db:', this.dbPath], __filename, true);
                callback(err, null);
                return;
            }

            logger.log(['Connected to database:', this.dbPath], __filename, false);

            var collection = db.collection(collectionName);
            collection.find().toArray(function(error, result) {
                db.close();
                if (error) {
                    logger.log(
                        ['Retrieving all objects from:', collectionName],
                        __filename,
                        true
                    );

                    callback(error, null);
                    return;
                }

                if (callback) {
                    callback(null, result);
                }
            });
        }.bind(this));
    };

    this.retrieveWithId = function (collectionName, id, callback) {
        logger.log(['Retrieving objects for:', collectionName], __filename, false);
        this._connect(function (err, db) {
            if (err) {
                logger.log(
                    ['Failed to connect to db:', this.dbPath],
                    __filename,
                    true
                );

                callback(err, null);
                return;
            }

            logger.log(['Connected to database:', this.dbPath], __filename, false);

            var objectId = new ObjectID(id);
            var collection = db.collection(collectionName);
            collection.find({_id:objectId}).toArray(function(error, result) {
                db.close();
                if (error) {
                    logger.log(
                        ['Retrieving all objects from: ', collectionName],
                        __filename,
                        true
                    );

                    callback(error, null);
                    return;
                }

                if (callback) {
                    callback(null, result);
                }
            });
        }.bind(this));
    };
}

module.exports = DbWrapper;
