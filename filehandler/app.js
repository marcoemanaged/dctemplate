var server = require('z-http');
var sql = require('./db/sql');
var config = require('./config/config');

sql.STATUS = server.STATUS;

var http = {
    validation: function (data, callback) {
        this.data = data;
        this.callback = callback;

        this.trig = function () {
            var data = this.data;
            var callback = this.callback;

            callback(data);
        }
    },

    onresponse: function (st, status) {
        
    },

    callback: function (route, method) {

        var path = route.replace('api/', '');

        switch (method.toUpperCase()) {
            case "GET":
                return http.methods.GET(path);
            case "POST":
                return http.methods.POST(path);
            case "PUT":
                return http.methods.PUT(path);
            case "DELETE":
                return http.methods.DELETE(path);
            default:
                break;
        }

        return http.router.nopage;
    }
};

require('./http/method')(http);
require('./http/router')(http, sql, server);


server.start(config.port, http.callback, { contentType: server.CONTENT_TYPE.JSON, validation: http.validation, onresponse: http.onresponse })

