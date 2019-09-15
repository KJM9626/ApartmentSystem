module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'apartment',
        password: 'xinhaoran',
        char: 'utf8mb4'
    }
});