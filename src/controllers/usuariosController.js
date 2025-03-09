const userService = require('../services/usuariosService');

const getOneUser = async (req, res) => {

    const { params: { userId } } = req;

    if (!userId) {
        return res.status(400).send({ status: 'Error', message: 'Necesita el :userId no puede estar vacío' });
    }

    try {
        const usuario = await userService.getOneUser(userId);
        res.send({ status: "OK", data: usuario });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const authentifyUser = async (req, res) => {

    const { username, email } = req.query;

    if (!username || !email) {
        return res.status(400).send({ status: 'Error', message: 'Necesita el username y el email no puede estar vacío' });
    }

    try {
        const usuario = await userService.authentifyUser({ username, email });
        res.send({ status: "OK", data: usuario });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const createNewUser = async (req,res) => {

    const body  = req.body;
    
    if (
        !body.username ||
        !body.email
    ) {
        res.status(400).send({ status: 'Missing fields', data: { error: 'Faltan datos' }}
        )
        return;
    }
    const newUser = {
        username: body.username,
        email: body.email,
        role: body.role ?? 'normal'
    };

    try {
        const createdUser = await userService.createNewUser(newUser);
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