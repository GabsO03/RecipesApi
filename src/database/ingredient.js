const DB = require('./db.json');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');

const saveDatabase = (DB) => {
    fs.writeFileSync(dbPath, JSON.stringify(DB, null, 2), 'utf-8');
}


const getAllIngredients = (q) => {
    try {
        let ingredientes = DB.ingredientes;

        if (q) {
            ingredientes = ingredientes.filter(ing => ing.toLowerCase().includes(q.toLowerCase())).splice(0, 8);
        }

        return ingredientes
    } catch (error) {
        console.log('Hubo un error');
        throw { status: 500, message: error }
    }
}

const createNewIngredient = (newingrediente) => {

    const yaExiste = DB.ingredientes.findIndex((ingrediente) => ingrediente.toLowerCase().localeCompare(newingrediente.toLowerCase(), 'es', { sensitivity: "base" }) === 0) > -1;

    if (yaExiste) {
        throw {
            status: 400,
            message: `ingrediente with name '${newingrediente}' already exists`
        }
    }

    try {
        DB.ingredientes.push(newingrediente);
        saveDatabase(DB);
        return newingrediente;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

module.exports = { 
    getAllIngredients,
    createNewIngredient
 }