const express = require('express');
const IngredientController = require('../../controllers/ingredientsController');

const router = express.Router();

router.get('/', IngredientController.getAllIngredients);

router.post('/', IngredientController.createNewIngredient);

module.exports = router;