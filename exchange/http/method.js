exports = module.exports = function (http) {

    http.methods = {
        UNAUTH: function (path) {
            return http.router.unautorize;
        },

        GET: function (path) {

            switch (path) {
                case 'users/get':
                    return http.router.users.get;
                default:
                    return http.router.nopage;
            }
        },

        POST: function (path) {
            switch (path) {
                default:
                    return http.router.nopage;
            }
        },

        PUT: function (path) {
            switch (path) {
                default:
                    return http.router.nopage;
            }
        },

        DELETE: function (path) {
            switch (path) {
                default:
                    return http.router.nopage;
            }
        }
    }


}
