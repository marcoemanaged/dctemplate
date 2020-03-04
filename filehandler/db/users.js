


/* handles users requests */

exports = module.exports = function (req) {
    req.users = {
        TABLE: 'tbl_users',
        BASIC_FIELDS: '*',

        get: function (callback) {

            req.call(callback, (pool) => {
                return pool.request()
                    .query(req.calls.select(req.users.BASIC_FIELDS, req.users.TABLE));
            })

        }
    }
}
