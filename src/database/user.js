const pool = require('../config/connection_db');

const getOneUser = async (userId) => {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [userId]);
        if (rows.length === 0) {
            throw { status: 400, message: "Can't find username" };
        }
        return rows[0];
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const authentifyUser = async (params) => {
    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND email = $2';

        const respuesta = await pool.query(query, [params.username, params.email]);

        if (respuesta.rows.length === 0) {
            throw { status: 400, message: "Can't find username" };
        }
        return respuesta.rows[0];
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewUser = async (newUser) => {
    try {
        const query = 'INSERT INTO users (id, username, email, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [newUser.id, newUser.username, newUser.email, newUser.role];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = {
    getOneUser,
    authentifyUser,
    createNewUser
 }