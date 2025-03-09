const { v4: uuid } = require('uuid');
const User = require('../database/user');

const getOneUser = async (userId) => {
    try {
        const users = await User.getOneUser(userId);
        return users;
    } catch (error) {
        throw error;
    }
}

const authentifyUser = async (params) => {
    try {
        const users = await User.authentifyUser(params);
        return users;
    } catch (error) {
        throw error;
    }
}

const createNewUser = async (newUser) => {
    
    const userToInsert = {
        id: uuid(),
        ...newUser
    };

    try {
        const createdUser = await User.createNewUser(userToInsert);
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