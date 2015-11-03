var express = require('express');
var bodyParser = require('body-parser');
var Logger = require('./logger');
function App() {
    this.run = function () {
        var app = express();
        app.use(bodyParser.json());

        var port = process.env.CAMPLIGHT_PORT || 8081;
        var server = app.listen(port, function () {
           Logger.log(
               'camplight server running on port: ' + port.toString(),
               __filename,
               false,
               false
           );
        });
    }
}

module.exports = App;
