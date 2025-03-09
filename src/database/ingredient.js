const pool = require('../config/connection_db');


const getAllIngredients = async (q) => {
    try {
        let query = `SELECT * FROM ingredients`;
        const values = [];

        if (q) {
            query += ` WHERE name ILIKE $1 LIMIT 8`;
            values.push(`%${q}%`);
        }

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.log('Hubo un error');
        throw { status: 500, message: error };
    }
};

const createNewIngredient = async (newIngredient) => {
    try {
        const checkQuery = `SELECT COUNT(*) FROM ingredients WHERE LOWER(name) = LOWER($1)`;
        const checkResult = await pool.query(checkQuery, [newIngredient]);
        
        if (parseInt(checkResult.rows[0].count) > 0) {
            throw {
                status: 400,
                message: `Ingredient with name '${newIngredient}' already exists`
            };
        }

        const insertQuery = `INSERT INTO ingredients (name) VALUES ($1) RETURNING *`;
        const result = await pool.query(insertQuery, [newIngredient]);
        return result.rows[0];
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = { 
    getAllIngredients,
    createNewIngredient
 }