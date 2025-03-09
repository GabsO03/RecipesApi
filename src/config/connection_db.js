require('dotenv').config();
const { Pool } = require('pg');

const dbProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

if (process.env.ENVIRONMENT === 'production') {
    dbProperties['ssl'] = { rejectUnauthorized: false };
}

const pool = new Pool(dbProperties);

module.exports = pool;