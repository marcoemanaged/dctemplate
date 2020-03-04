const sql = require('mssql');
const config = require('../config/config');


/*
    * 1) DB - design full db for user login
    * 2) API calls - GET, POST, PUT, DELETE for login
    * 3) AJAX - connect calls to client. 
    * 4) UIkit - design layout and uikit for login page
    * 5) LOGIN page - create 1st. page
    6) GANTT - set all times an prepare for next week meeting.
*/

sql.on('error', function (err) {
    console.log('An ERROR accured: ' + err);
});



var req = {
    callback: null,
    STATUS: null,

    calls: {
        select: function (value, tbl) {
            return 'select ' + value + ' from ' + tbl;
        },

        where: function (list) {
            var buffer = [];
            list.forEach(param => {
                buffer.push(param + ' = @' + param);
            });
            return 'where ' + buffer.join(' and ');
        },

        select_where: function (values, tbl, list) {
            return req.calls.select(values, tbl) + '  ' + req.calls.where(list);
        }
    },

    call: function (callback, afganit) {

        new sql.ConnectionPool(config.sqlConfig).connect().then(pool => {
            //log request
            // console.log("pool: " + JSON.stringify(pool));
            // logger.db.request(req.parse.jsonResponse(pool));
            return afganit(pool, sql);
        })

            .then((result) => { req.success(result, callback) })
            .catch((result) => { req.error(result, callback) });

    },

    success: function (result, callback) {
        // console.log("res: " + JSON.stringify(result))
        let rows = result.recordsets.length > 1 ?
            result.recordsets : result.recordset ?
                result.recordset.length > 1 ?
                    result.recordset : result.recordset : {};
        if (typeof rows == 'undefined') {
            rows = {};
        }

        //log response
        //logger.db.response(req.parse.jsonResponse(rows));

        callback(rows);
        req.close();
    },

    error: function (err, callback) {
        var msg = 'DB ERROR: ' + err;

        
        callback({}, {
            msg: msg,
            status: 'err'
        });
        //logger.db.error(err);

        req.close();
    },

    parse: {
        jsonResponse: function (recordset) {
            var ans = {}

            if (!recordset.forEach) { return recordset }


            recordset.forEach(element => {
                if (element.length) {
                    var content = element[0];
                    Object.keys(content).forEach((ck) => {
                        var jsonStr = content[ck];
                        if (!jsonStr)
                            return;
                        var json = JSON.parse(jsonStr);
                        Object.keys(json).forEach((j) => {
                            var jsp = json[j];
                            if (j == "root") {
                                ans = req.parseElement(jsp[0]);
                            } else {
                                // handle elements that starts with '_' as root variables and not lists
                                if (j.startsWith('_')) {
                                    var obj = jsp[0];
                                    Object.keys(obj).map((key2) => {
                                        ans[key2] = req.parseElement(obj[key2]);
                                    })
                                }
                                // handle elements that ends with '!' as objects and not lists
                                else if (j.endsWith('!')) {
                                    ans[j.replace("!", "")] = req.parseElement(jsp)[0];
                                }
                                else {
                                    ans[j] = req.parseElement(jsp);
                                }
                            }
                        })
                    })
                }
            });
            return ans;
        }
    },

    close: function (params) {
        sql.close();
    },

    parseElement: function (obj) {

        for (var k in obj) {
            var el = obj[k];
            if (typeof el == 'object') {
                req.parseElement(el)
            }
            else if (isNaN(el)) {
                // try to pasre NaN element as date
                var orgFormat = new Date(el)
                // console.log("el: " + el);
                // console.log("newDate: " + newDate);
                if (!isNaN(orgFormat)) {
                    // console.log("Found date: " + k + " = " + el);
                    parseDate(orgFormat, el, obj, k);
                }
            }
        }
        return obj;
    }
}


/* bind to all db requests */
require('./users')(req);





module.exports = req;

function parseDate(orgFormat, org, obj, k) {
    let date = `${orgFormat.getDate()}/${orgFormat.getMonth() + 1}/${orgFormat.getFullYear()}`;
    obj[k] = { org, date, orgFormat };
}
