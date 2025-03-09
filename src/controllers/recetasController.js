const recipeService = require('../services/recetasService');

const getAllRecipes = async (req, res) => {

    const { q, limit } = req.query;

    try {
        const allRecipes = await recipeService.getAllRecipes({ q, limit });
        res.send({ status: "OK", data: allRecipes });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const getOneRecipe = async (req, res) => {
    const { params: { recipeId } } = req;

    if (!recipeId) {
        return res.status(400).send({ status: 'Error', message: 'El :recipeId no puede estar vacío' });
    }

    try {
        const recipe = await recipeService.getOneRecipe(recipeId);
        res.send({ status: "OK", data: recipe });        
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const createNewRecipe = async (req,res) => {

    const body  = req.body;
    if (
        !body.name ||
        !body.description ||
        !body.ingredients ||
        !body.tags ||
        !body.time ||
        !body.instructions
    ) {
        res.status(400).send({ status: 'Missing fields', data: { error: 'Faltan datos de la receta' }}
        )
        return;
    }
    const newRecipe = {
        name: body.name,
        description: body.description,
        ingredients: body.ingredients,
        tags: body.tags,
        time: body.time,
        instructions: body.instructions,
        alt_img: body.alt_img ?? ''
    };

    try {
        const createdRecipe = await recipeService.createNewRecipe(newRecipe);
        res.status(201).send({ status: "OK", data: createdRecipe });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

const updateOneRecipe = async (req, res) => {

    const { body, params: { recipeId } } = req;
    
    if (!recipeId) {
        return res.status(404).send({ status: 'Error', message: 'Faltan datos de la ingrediente' });
    }

    try {
        const updatedRecipe = await recipeService.updateOneRecipe(recipeId, body);
        res.send({ status: "OK", data: updatedRecipe });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
    
}

const deleteOneRecipe = async (req, res) => {
    const { params: { recipeId } } = req;

    if (!recipeId) {
        return res.status(404).send({ status: 'FAILED', data: { error: 'Parametro :recipeId no puede estar vacío' } });
    }

    try {
        await recipeService.deleteOneRecipe(recipeId);
        res.status(204).send({ status: 'OK' });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe,
};