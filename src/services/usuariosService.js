const { v4: uuid } = require('uuid');
const User = require('../database/user');
const { id } = require('apicache');
const { create } = require('domain');

const getOneUser = (userId) => {
    try {
        const users = User.getOneUser(userId);
        return users;
    } catch (error) {
        throw error;
    }
}

const authentifyUser = (params) => {
    try {
        const users = User.authentifyUser(params);
        return users;
    } catch (error) {
        throw error;
    }
}

const createNewUser = (newUser) => {
    
    const userToInsert = {
        id: uuid(),
        ...newUser
    };

    try {
        const createdUser = User.createNewUser(userToInsert);
        return createdUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOneUser,
    authentifyUser,
    createNewUser
};