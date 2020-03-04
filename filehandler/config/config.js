var config = {
    port: 80,
    
    secret: 'nemomolamoral',
    tokenExpiresInSeconds: 86400, // expires in 24 hours

    sqlConfig: {
        user: 'sa',
        password: 'password(!)123',
        server: 'mssqldb', // You can use 'localhost\\instance' to connect to named instance
        database: 'eManage',

        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    }
}

module.exports = config;