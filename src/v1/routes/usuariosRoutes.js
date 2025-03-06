const express = require('express');
const userController = require('../../controllers/usuariosController');

const router = express.Router();

router.get('/', userController.authentifyUser);

router.get('/:userId', userController.getOneUser);

router.post('/', userController.createNewUser);

module.exports = router;