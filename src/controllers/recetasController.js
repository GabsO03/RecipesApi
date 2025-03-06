const { describe } = require('node:test');
const recipeService = require('../services/recetasService');
const { error } = require('console');

const getAllRecipes = (req, res) => {

    const { q, limit } = req.query;

    try {
        const allRecipes = recipeService.getAllRecipes({ q, limit });
        res.send({ status: "OK", data: allRecipes });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const getOneRecipe = (req, res) => {
    const { params: { recipeId } } = req;

    if (!recipeId) {
        return res.status(400).send({ status: 'Error', message: 'El :recipeId no puede estar vacío' });
    }

    try {
        const recipe = recipeService.getOneRecipe(recipeId);
        res.send({ status: "OK", data: recipe });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const createNewRecipe = (req,res) => {

    const body  = req.body;
    if (
        !body.name ||
        !body.description ||
        !body.ingredients ||
        !body.categories ||
        !body.time ||
        !body.instructions
    ) {
        res.status(400).send({ status: 'Missing fields', data: { error: 'Faltan datos de la ingrediente' }}
        )
        return;
    }
    const newRecipe = {
        name: body.name,
        description: body.description,
        ingredients: body.ingredients,
        categories: body.categories,
        time: body.time,
        instructions: body.instructions
    };

    try {
        const createdRecipe = recipeService.createNewRecipe(newRecipe);
        res.status(201).send({ status: "OK", data: createdRecipe });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

const updateOneRecipe = (req, res) => {

    const { body, params: { recipeId } } = req;
    
    if (!recipeId) {
        return res.status(404).send({ status: 'Error', message: 'Faltan datos de la ingrediente' });
    }

    try {
        const updatedRecipe = recipeService.updateOneRecipe(recipeId, body);
        res.send({ status: "OK", data: updatedRecipe });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
    
}

const deleteOneRecipe = (req, res) => {
    const { params: { recipeId } } = req;

    if (!recipeId) {
        return res.status(404).send({ status: 'FAILED', data: { error: 'Parametro :recipeId no puede estar vacío' } });
    }

    try {
        recipeService.deleteOneRecipe(recipeId);
        res.status(204).send({ status: 'OK' });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

    recipeService.deleteOneRecipe(recipeId);
    res.send({ status: "OK" });
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe,
};