
exports = module.exports = function (http, sql, server) {

    http.router = {
        unautorize: function (data, callback) {
            var st = server.status(server.STATUS.UNAUTHORIZED);
            callback(st.value, st.key);
        },

        users: {
            get: function (data, callback) {
                var list = [
                    {  name: 'zada' },
                    { name: 'adeel' },
                    { name: 'marco' },
                    { name: 'peyman' }
                ]
                callback(list, server.STATUS.OK);
            }
        },

        nopage: function (data, callback) {
            callback('NO PAGE');
        }
    }

}
