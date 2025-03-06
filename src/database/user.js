const DB = require('./db.json');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');

const saveDatabase = (DB) => {
    fs.writeFileSync(dbPath, JSON.stringify(DB, null, 2), 'utf-8');
}

const getOneUser = (userId) => {

    try {
        const user = DB.users.find((user) => user.id == userId);

        if (!user) {
            throw {
                status: 400,
                message: 'Can`t find user'
            };
        }
        return user;
    } catch (error) {
        throw { status: error?.status || 580, message: error?.message || error };
    }
}

const authentifyUser = (params) => {

    try {
        const user = DB.users.find((user) => user.user == params.user && user.email == params.email);

        if (!user) {
            throw {
                status: 400,
                message: 'Can`t find user'
            };
        }
        return user;
    } catch (error) {
        throw { status: error?.status || 580, message: error?.message || error };
    }
}

const createNewUser = (newUser) => {

    console.log(newUser);

    const yaExiste = DB.users.findIndex((user) => user.user == newUser.user && user.email == newUser.email) > -1;

    if (yaExiste) {
        throw {
            status: 400,
            message: `User already exists`
        }
    }

    try {
        DB.users.push(newUser);
        saveDatabase(DB);
        return newUser;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

module.exports = {
    getOneUser,
    authentifyUser,
    createNewUser
 }