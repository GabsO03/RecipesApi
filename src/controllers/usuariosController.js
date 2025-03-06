const { describe } = require('node:test');
const userService = require('../services/usuariosService');
const { error } = require('console');

const getOneUser = (req, res) => {

    const { params: { userId } } = req;

    if (!userId) {
        return res.status(400).send({ status: 'Error', message: 'Necesita el :userId no puede estar vacío' });
    }

    try {
        const usuario = userService.getOneUser(userId);
        res.send({ status: "OK", data: usuario });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const authentifyUser = (req, res) => {

    const { user, email } = req.query;

    if (!user || !email) {
        return res.status(400).send({ status: 'Error', message: 'Necesita el user y el email no puede estar vacío' });
    }

    try {
        const usuario = userService.authentifyUser({ user, email });
        res.send({ status: "OK", data: usuario });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const createNewUser = (req,res) => {

    const body  = req.body;
    
    if (
        !body.user ||
        !body.email
    ) {
        res.status(400).send({ status: 'Missing fields', data: { error: 'Faltan datos de la ingrediente' }}
        )
        return;
    }
    const newUser = {
        user: body.user,
        email: body.email
    };

    try {
        const createdUser = userService.createNewUser(newUser);
        res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

module.exports = {
    getOneUser,
    authentifyUser,
    createNewUser
};