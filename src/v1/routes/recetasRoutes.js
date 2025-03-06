const express = require('express');
const recipeController = require('../../controllers/recetasController');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);

router.get('/:recipeId', recipeController.getOneRecipe);

router.post('/', recipeController.createNewRecipe);

router.patch('/:recipeId', recipeController.updateOneRecipe);

router.delete('/:recipeId', recipeController.deleteOneRecipe);

module.exports = router;